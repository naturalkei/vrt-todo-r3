import { cn } from '../lib/utils'

export function Header() {
  return (
    <header
      className={cn([
        'bg-nook-green',
        'text-white',
        'py-4',
        'px-6',
        'shadow-md',
      ])}
    >
      <h1
        className={cn([
          'text-2xl',
          'font-bold',
          'text-center',
          'flex',
          'items-center',
          'justify-center',
          'gap-2',
        ])}
      >
        <span>🍃</span>
        <span>Nook Todo List</span>
      </h1>
    </header>
  )
}
