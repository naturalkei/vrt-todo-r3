import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd'
import { TodoItem } from './TodoItem'
import { cn } from '../lib/utils'
import type { Todo } from '../types/todo'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onReorder: (todos: Todo[]) => void
}

export function TodoList({ todos, onToggle, onDelete, onReorder }: TodoListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onReorder(items)
  }

  if (todos.length === 0) {
    return (
      <div
        className={cn([
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'py-16',
          'px-4',
        ])}
      >
        <p
          className={cn([
            'text-gray-400',
            'text-lg',
          ])}
        >
          No tasks found
        </p>
        <p
          className={cn([
            'text-gray-400',
            'text-sm',
            'mt-2',
          ])}
        >
          Add a new task to get started! 🍃
        </p>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn([
              'px-4',
              'py-4',
              'space-y-3',
            ])}
          >
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
