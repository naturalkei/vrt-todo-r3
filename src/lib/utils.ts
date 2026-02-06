import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  
  if (targetDate.getTime() === today.getTime()) {
    return 'Today'
  } else if (targetDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow'
  }
  
  return date.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  })
}

export function getPriorityColor(priority: 'low' | 'medium' | 'high'): string {
  const colors = {
    low: 'text-blue-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  }
  return colors[priority]
}

export function getPriorityLabel(priority: 'low' | 'medium' | 'high'): string {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }
  return labels[priority]
}
