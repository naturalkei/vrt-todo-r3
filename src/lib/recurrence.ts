import { addDays, addWeeks, addMonths } from 'date-fns'
import type { RecurrenceType, Todo } from '../types/todo'

export function calculateNextDueDate(
  currentDueDate: string | null,
  recurrence: RecurrenceType
): string | null {
  if (!currentDueDate || recurrence === 'none') {
    return currentDueDate
  }

  const date = new Date(currentDueDate)

  switch (recurrence) {
    case 'daily':
      return addDays(date, 1).toISOString()
    case 'weekly':
      return addWeeks(date, 1).toISOString()
    case 'monthly':
      return addMonths(date, 1).toISOString()
    default:
      return currentDueDate
  }
}

export function handleRecurringTodo(todo: Todo): Todo {
  if (todo.recurrence === 'none' || !todo.dueDate) {
    return { ...todo, completed: !todo.completed }
  }

  if (!todo.completed) {
    const nextDueDate = calculateNextDueDate(todo.dueDate, todo.recurrence)
    return {
      ...todo,
      completed: true,
      dueDate: nextDueDate,
    }
  }

  return { ...todo, completed: false }
}
