import { cn } from '../lib/utils'
import type { ViewMode } from '../types/todo'

interface ViewModeTabsProps {
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
  counts: {
    all: number
    active: number
    completed: number
  }
}

export function ViewModeTabs({ viewMode, onChange, counts }: ViewModeTabsProps) {
  const tabs: Array<{ mode: ViewMode; label: string }> = [
    { mode: 'all', label: 'All' },
    { mode: 'active', label: 'Active' },
    { mode: 'completed', label: 'Completed' },
  ]

  return (
    <div
      className={cn([
        'flex',
        'gap-2',
        'px-4',
        'pt-4',
      ])}
    >
      {tabs.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={cn([
            'flex-1',
            'py-2',
            'px-4',
            'rounded-full',
            'text-sm',
            'font-medium',
            'transition-all',
            'border-2',
            viewMode === mode
              ? ['bg-nook-green', 'text-white', 'border-nook-green']
              : ['bg-white', 'text-nook-text', 'border-nook-border', 'hover:border-nook-green'],
          ])}
        >
          {label} ({counts[mode]})
        </button>
      ))}
    </div>
  )
}
