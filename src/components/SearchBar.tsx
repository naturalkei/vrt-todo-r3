import { cn } from '../lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div
      className={cn([
        'px-4',
        'pt-4',
      ])}
    >
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn([
          'w-full',
          'px-4',
          'py-3',
          'rounded-full',
          'border-2',
          'border-nook-border',
          'bg-white',
          'text-nook-text',
          'placeholder-gray-400',
          'focus:outline-none',
          'focus:border-nook-green',
          'transition-colors',
        ])}
      />
    </div>
  )
}
