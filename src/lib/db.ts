import { openDB, type IDBPDatabase } from 'idb'
import type { Todo } from '../types/todo'

const DB_NAME = 'todo-db'
const DB_VERSION = 1
const STORE_NAME = 'todos'

let dbInstance: IDBPDatabase | null = null

export async function initDB(): Promise<IDBPDatabase> {
  if (dbInstance) {
    return dbInstance
  }

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('order', 'order')
        store.createIndex('completed', 'completed')
        store.createIndex('priority', 'priority')
        store.createIndex('dueDate', 'dueDate')
        store.createIndex('createdAt', 'createdAt')
      }
    },
  })

  return dbInstance
}

export async function getAllTodos(): Promise<Todo[]> {
  const db = await initDB()
  const todos = await db.getAllFromIndex(STORE_NAME, 'order')
  return todos
}

export async function getTodoById(id: string): Promise<Todo | undefined> {
  const db = await initDB()
  return db.get(STORE_NAME, id)
}

export async function addTodo(todo: Todo): Promise<void> {
  const db = await initDB()
  await db.add(STORE_NAME, todo)
}

export async function updateTodo(todo: Todo): Promise<void> {
  const db = await initDB()
  await db.put(STORE_NAME, todo)
}

export async function deleteTodo(id: string): Promise<void> {
  const db = await initDB()
  await db.delete(STORE_NAME, id)
}

export async function clearAllTodos(): Promise<void> {
  const db = await initDB()
  await db.clear(STORE_NAME)
}

export async function bulkUpdateTodos(todos: Todo[]): Promise<void> {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  await Promise.all([
    ...todos.map(todo => tx.store.put(todo)),
    tx.done,
  ])
}
