import { useState } from 'react'
import { cn } from '../lib/utils'
import type { Priority, RecurrenceType } from '../types/todo'

interface AddTodoFormProps {
  onAdd: (data: {
    title: string
    priority: Priority
    dueDate: string | null
    recurrence: RecurrenceType
  }) => void
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')
  const [recurrence, setRecurrence] = useState<RecurrenceType>('none')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
      recurrence,
    })

    setTitle('')
    setPriority('medium')
    setDueDate('')
    setRecurrence('none')
    setIsExpanded(false)
  }

  return (
    <div
      className={cn([
        'px-4',
        'pt-4',
      ])}
    >
      <form onSubmit={handleSubmit}>
        <div
          className={cn([
            'bg-white',
            'rounded-2xl',
            'border-2',
            'border-nook-border',
            'p-4',
            'shadow-sm',
          ])}
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className={cn([
              'w-full',
              'text-nook-text',
              'placeholder-gray-400',
              'focus:outline-none',
              'text-base',
            ])}
          />

          {isExpanded && (
            <div
              className={cn([
                'mt-4',
                'space-y-3',
              ])}
            >
              <div>
                <label
                  className={cn([
                    'block',
                    'text-sm',
                    'font-medium',
                    'text-nook-text',
                    'mb-2',
                  ])}
                >
                  Priority
                </label>
                <div
                  className={cn([
                    'flex',
                    'gap-2',
                  ])}
                >
                  {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={cn([
                        'flex-1',
                        'py-2',
                        'px-3',
                        'rounded-lg',
                        'text-sm',
                        'font-medium',
                        'transition-colors',
                        'border',
                        priority === p
                          ? ['bg-nook-green', 'text-white', 'border-nook-green']
                          : ['bg-white', 'text-nook-text', 'border-nook-border'],
                      ])}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className={cn([
                    'block',
                    'text-sm',
                    'font-medium',
                    'text-nook-text',
                    'mb-2',
                  ])}
                >
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={cn([
                    'w-full',
                    'px-3',
                    'py-2',
                    'rounded-lg',
                    'border',
                    'border-nook-border',
                    'text-nook-text',
                    'focus:outline-none',
                    'focus:border-nook-green',
                  ])}
                />
              </div>

              <div>
                <label
                  className={cn([
                    'block',
                    'text-sm',
                    'font-medium',
                    'text-nook-text',
                    'mb-2',
                  ])}
                >
                  Recurrence
                </label>
                <select
                  value={recurrence}
                  onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
                  className={cn([
                    'w-full',
                    'px-3',
                    'py-2',
                    'rounded-lg',
                    'border',
                    'border-nook-border',
                    'text-nook-text',
                    'focus:outline-none',
                    'focus:border-nook-green',
                  ])}
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div
                className={cn([
                  'flex',
                  'gap-2',
                  'pt-2',
                ])}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false)
                    setTitle('')
                  }}
                  className={cn([
                    'flex-1',
                    'py-2',
                    'px-4',
                    'rounded-full',
                    'bg-gray-100',
                    'text-nook-text',
                    'font-medium',
                    'hover:bg-gray-200',
                    'transition-colors',
                  ])}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className={cn([
                    'flex-1',
                    'py-2',
                    'px-4',
                    'rounded-full',
                    'bg-nook-green',
                    'text-white',
                    'font-medium',
                    'hover:bg-opacity-90',
                    'transition-all',
                    'disabled:opacity-50',
                    'disabled:cursor-not-allowed',
                  ])}
                >
                  Add Task
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
