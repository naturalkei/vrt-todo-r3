import { cn } from '../lib/utils'
import type { FilterType } from '../types/todo'

interface FilterButtonsProps {
  filter: FilterType
  onChange: (filter: FilterType) => void
}

export function FilterButtons({ filter, onChange }: FilterButtonsProps) {
  const filters: Array<{ type: FilterType; label: string; icon: string }> = [
    { type: 'all', label: 'All', icon: '📋' },
    { type: 'today', label: 'Today', icon: '📅' },
    { type: 'week', label: 'This Week', icon: '🗓️' },
    { type: 'priority', label: 'Priority', icon: '⭐' },
  ]

  return (
    <div
      className={cn([
        'flex',
        'gap-2',
        'px-4',
        'pt-3',
        'overflow-x-auto',
        'pb-1',
      ])}
    >
      {filters.map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={cn([
            'flex',
            'items-center',
            'gap-2',
            'py-2',
            'px-4',
            'rounded-full',
            'text-sm',
            'font-medium',
            'whitespace-nowrap',
            'transition-all',
            'border',
            filter === type
              ? ['bg-nook-green/10', 'text-nook-green', 'border-nook-green']
              : ['bg-white', 'text-nook-text', 'border-nook-border', 'hover:border-nook-green'],
          ])}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
