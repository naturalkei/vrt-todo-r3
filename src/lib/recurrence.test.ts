import { describe, it, expect } from 'vitest'
import { calculateNextDueDate, handleRecurringTodo } from './recurrence'
import type { Todo } from '../types/todo'

describe('calculateNextDueDate', () => {
  const baseDate = '2024-01-01T00:00:00.000Z'

  it('should return null for null date', () => {
    expect(calculateNextDueDate(null, 'daily')).toBeNull()
  })

  it('should return same date for none recurrence', () => {
    expect(calculateNextDueDate(baseDate, 'none')).toBe(baseDate)
  })

  it('should add 1 day for daily recurrence', () => {
    const next = calculateNextDueDate(baseDate, 'daily')
    expect(next).toContain('2024-01-02')
  })

  it('should add 1 week for weekly recurrence', () => {
    const next = calculateNextDueDate(baseDate, 'weekly')
    expect(next).toContain('2024-01-08')
  })

  it('should add 1 month for monthly recurrence', () => {
    const next = calculateNextDueDate(baseDate, 'monthly')
    expect(next).toContain('2024-02-01')
  })
})

describe('handleRecurringTodo', () => {
  const baseTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    completed: false,
    priority: 'medium',
    dueDate: '2024-01-01T00:00:00.000Z',
    recurrence: 'none',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    order: 0,
  }

  it('should toggle completion for non-recurring todo', () => {
    const result = handleRecurringTodo(baseTodo)
    expect(result.completed).toBe(true)
    expect(result.dueDate).toBe(baseTodo.dueDate)
  })

  it('should update due date when completing recurring todo', () => {
    const recurringTodo = { ...baseTodo, recurrence: 'daily' as const }
    const result = handleRecurringTodo(recurringTodo)
    expect(result.completed).toBe(true)
    expect(result.dueDate).not.toBe(baseTodo.dueDate)
  })

  it('should toggle back to incomplete', () => {
    const completedTodo = { ...baseTodo, completed: true }
    const result = handleRecurringTodo(completedTodo)
    expect(result.completed).toBe(false)
  })
})
