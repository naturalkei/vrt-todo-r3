import { describe, it, expect } from 'vitest'
import { formatDate, getPriorityColor, getPriorityLabel } from './utils'

describe('formatDate', () => {
  it('should return empty string for null', () => {
    expect(formatDate(null)).toBe('')
  })

  it('should return "Today" for today\'s date', () => {
    const today = new Date().toISOString()
    expect(formatDate(today)).toBe('Today')
  })

  it('should return "Tomorrow" for tomorrow\'s date', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    expect(formatDate(tomorrow.toISOString())).toBe('Tomorrow')
  })
})

describe('getPriorityColor', () => {
  it('should return correct color for low priority', () => {
    expect(getPriorityColor('low')).toBe('text-blue-500')
  })

  it('should return correct color for medium priority', () => {
    expect(getPriorityColor('medium')).toBe('text-yellow-500')
  })

  it('should return correct color for high priority', () => {
    expect(getPriorityColor('high')).toBe('text-red-500')
  })
})

describe('getPriorityLabel', () => {
  it('should return capitalized labels', () => {
    expect(getPriorityLabel('low')).toBe('Low')
    expect(getPriorityLabel('medium')).toBe('Medium')
    expect(getPriorityLabel('high')).toBe('High')
  })
})
