import { useMemo } from 'react'
import { isToday, isThisWeek } from 'date-fns'
import type { Todo, ViewMode, FilterType } from '../types/todo'

export function useFilteredTodos(
  todos: Todo[],
  searchQuery: string,
  viewMode: ViewMode,
  filter: FilterType
): Todo[] {
  return useMemo(() => {
    let filtered = [...todos]

    // Apply view mode filter
    if (viewMode === 'active') {
      filtered = filtered.filter(t => !t.completed)
    } else if (viewMode === 'completed') {
      filtered = filtered.filter(t => t.completed)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(query)
      )
    }

    // Apply additional filters
    if (filter === 'today') {
      filtered = filtered.filter(t =>
        t.dueDate && isToday(new Date(t.dueDate))
      )
    } else if (filter === 'week') {
      filtered = filtered.filter(t =>
        t.dueDate && isThisWeek(new Date(t.dueDate))
      )
    } else if (filter === 'priority') {
      filtered = filtered.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
    }

    return filtered
  }, [todos, searchQuery, viewMode, filter])
}
