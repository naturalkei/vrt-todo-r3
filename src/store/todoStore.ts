import { create } from 'zustand'
import { nanoid } from 'nanoid'
import type {
  Todo,
  CreateTodoInput,
  ViewMode,
  FilterType,
} from '../types/todo'
import {
  getAllTodos,
  addTodo as dbAddTodo,
  updateTodo as dbUpdateTodo,
  deleteTodo as dbDeleteTodo,
  clearAllTodos,
  bulkUpdateTodos,
} from '../lib/db'
import { handleRecurringTodo } from '../lib/recurrence'

interface TodoStore {
  todos: Todo[]
  searchQuery: string
  viewMode: ViewMode
  filter: FilterType
  isLoading: boolean

  // Actions
  loadTodos: () => Promise<void>
  addTodo: (input: CreateTodoInput) => Promise<void>
  toggleTodo: (id: string) => Promise<void>
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  reorderTodos: (todos: Todo[]) => Promise<void>
  setSearchQuery: (query: string) => void
  setViewMode: (mode: ViewMode) => void
  setFilter: (filter: FilterType) => void
  exportTodos: () => string
  importTodos: (json: string) => Promise<void>
  clearAllTodos: () => Promise<void>
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  searchQuery: '',
  viewMode: 'all',
  filter: 'all',
  isLoading: false,

  loadTodos: async () => {
    set({ isLoading: true })
    try {
      const todos = await getAllTodos()
      set({ todos, isLoading: false })
    } catch (error) {
      console.error('Failed to load todos:', error)
      set({ isLoading: false })
    }
  },

  addTodo: async (input) => {
    const { todos } = get()
    const maxOrder = todos.length > 0
      ? Math.max(...todos.map(t => t.order))
      : -1

    const newTodo: Todo = {
      id: nanoid(),
      title: input.title,
      completed: false,
      priority: input.priority || 'medium',
      dueDate: input.dueDate || null,
      recurrence: input.recurrence || 'none',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: maxOrder + 1,
    }

    await dbAddTodo(newTodo)
    set({ todos: [...todos, newTodo] })
  },

  toggleTodo: async (id) => {
    const { todos } = get()
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const updatedTodo = handleRecurringTodo(todo)
    updatedTodo.updatedAt = new Date().toISOString()

    await dbUpdateTodo(updatedTodo)
    set({
      todos: todos.map(t => (t.id === id ? updatedTodo : t)),
    })
  },

  updateTodo: async (id, updates) => {
    const { todos } = get()
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
        : todo
    )

    const updatedTodo = updatedTodos.find(t => t.id === id)
    if (updatedTodo) {
      await dbUpdateTodo(updatedTodo)
      set({ todos: updatedTodos })
    }
  },

  deleteTodo: async (id) => {
    const { todos } = get()
    await dbDeleteTodo(id)
    set({ todos: todos.filter(t => t.id !== id) })
  },

  reorderTodos: async (reorderedTodos) => {
    const todosWithNewOrder = reorderedTodos.map((todo, index) => ({
      ...todo,
      order: index,
      updatedAt: new Date().toISOString(),
    }))

    await bulkUpdateTodos(todosWithNewOrder)
    set({ todos: todosWithNewOrder })
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  setFilter: (filter) => {
    set({ filter })
  },

  exportTodos: () => {
    const { todos } = get()
    return JSON.stringify(todos, null, 2)
  },

  importTodos: async (json) => {
    try {
      const importedTodos = JSON.parse(json) as Todo[]
      await clearAllTodos()
      await bulkUpdateTodos(importedTodos)
      set({ todos: importedTodos })
    } catch (error) {
      console.error('Failed to import todos:', error)
      throw new Error('Invalid JSON format')
    }
  },

  clearAllTodos: async () => {
    await clearAllTodos()
    set({ todos: [] })
  },
}))
