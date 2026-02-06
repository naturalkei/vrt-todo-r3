import { useEffect } from 'react'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { ViewModeTabs } from './components/ViewModeTabs'
import { FilterButtons } from './components/FilterButtons'
import { AddTodoForm } from './components/AddTodoForm'
import { TodoList } from './components/TodoList'
import { ImportExport } from './components/ImportExport'
import { useTodoStore } from './store/todoStore'
import { useFilteredTodos } from './hooks/useFilteredTodos'
import type { CreateTodoInput } from './types/todo'

function App() {
  const {
    todos,
    searchQuery,
    viewMode,
    filter,
    isLoading,
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    reorderTodos,
    setSearchQuery,
    setViewMode,
    setFilter,
    exportTodos,
    importTodos,
  } = useTodoStore()

  const filteredTodos = useFilteredTodos(todos, searchQuery, viewMode, filter)

  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  const handleAddTodo = async (input: CreateTodoInput) => {
    await addTodo(input)
  }

  const handleExport = () => {
    const json = exportTodos()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nook-todos-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (file: File) => {
    try {
      const text = await file.text()
      await importTodos(text)
      alert('✅ Todos imported successfully!')
    } catch (error) {
      alert('❌ Failed to import todos. Please check the file format.')
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nook-bg flex items-center justify-center">
        <div className="text-nook-green text-xl font-bold">
          🍃 Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nook-bg">
      <Header />
      
      <div className="max-w-2xl mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <ViewModeTabs
          viewMode={viewMode}
          onChange={setViewMode}
          counts={counts}
        />
        
        <FilterButtons filter={filter} onChange={setFilter} />
        
        <AddTodoForm onAdd={handleAddTodo} />
        
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onReorder={reorderTodos}
        />
        
        <ImportExport onExport={handleExport} onImport={handleImport} />
      </div>
    </div>
  )
}

export default App
