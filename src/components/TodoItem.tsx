import { Draggable } from '@hello-pangea/dnd'
import { cn, formatDate, getPriorityColor, getPriorityLabel } from '../lib/utils'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  index: number
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, index, onToggle, onDelete }: TodoItemProps) {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn([
            'bg-white',
            'rounded-2xl',
            'border-2',
            'border-nook-border',
            'p-4',
            'shadow-sm',
            'transition-all',
            'hover:shadow-md',
            snapshot.isDragging && ['shadow-lg', 'rotate-2'],
          ])}
        >
          <div
            className={cn([
              'flex',
              'items-start',
              'gap-3',
            ])}
          >
            <button
              onClick={() => onToggle(todo.id)}
              className={cn([
                'flex-shrink-0',
                'w-6',
                'h-6',
                'rounded-full',
                'border-2',
                'transition-all',
                'mt-0.5',
                todo.completed
                  ? ['bg-nook-green', 'border-nook-green']
                  : ['border-nook-border', 'hover:border-nook-green'],
              ])}
            >
              {todo.completed && (
                <svg
                  className={cn([
                    'w-full',
                    'h-full',
                    'text-white',
                  ])}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            <div
              className={cn([
                'flex-1',
                'min-w-0',
              ])}
            >
              <p
                className={cn([
                  'text-base',
                  'text-nook-text',
                  todo.completed && ['line-through', 'opacity-50'],
                ])}
              >
                {todo.title}
              </p>

              <div
                className={cn([
                  'flex',
                  'flex-wrap',
                  'gap-2',
                  'mt-2',
                  'text-sm',
                ])}
              >
                {todo.dueDate && (
                  <span
                    className={cn([
                      'flex',
                      'items-center',
                      'gap-1',
                      'text-gray-600',
                    ])}
                  >
                    📅 {formatDate(todo.dueDate)}
                  </span>
                )}

                <span
                  className={cn([
                    'flex',
                    'items-center',
                    'gap-1',
                    getPriorityColor(todo.priority),
                  ])}
                >
                  ⭐ {getPriorityLabel(todo.priority)}
                </span>

                {todo.recurrence !== 'none' && (
                  <span
                    className={cn([
                      'flex',
                      'items-center',
                      'gap-1',
                      'text-nook-green',
                    ])}
                  >
                    🔄 {todo.recurrence}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDelete(todo.id)}
              className={cn([
                'flex-shrink-0',
                'w-8',
                'h-8',
                'rounded-full',
                'hover:bg-red-100',
                'text-red-500',
                'transition-colors',
                'flex',
                'items-center',
                'justify-center',
              ])}
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}
