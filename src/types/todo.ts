export type Priority = 'low' | 'medium' | 'high'

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'none'

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  dueDate: string | null
  recurrence: RecurrenceType
  createdAt: string
  updatedAt: string
  order: number
}

export interface CreateTodoInput {
  title: string
  priority?: Priority
  dueDate?: string | null
  recurrence?: RecurrenceType
}

export type ViewMode = 'all' | 'active' | 'completed'

export type FilterType = 'all' | 'today' | 'week' | 'priority'
