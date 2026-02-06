import { useRef } from 'react'
import { cn } from '../lib/utils'

interface ImportExportProps {
  onExport: () => void
  onImport: (file: File) => void
}

export function ImportExport({ onExport, onImport }: ImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImport(file)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div
      className={cn([
        'flex',
        'gap-2',
        'px-4',
        'py-4',
      ])}
    >
      <button
        onClick={onExport}
        className={cn([
          'flex-1',
          'py-3',
          'px-4',
          'rounded-full',
          'bg-white',
          'border-2',
          'border-nook-border',
          'text-nook-text',
          'font-medium',
          'hover:border-nook-green',
          'transition-colors',
          'flex',
          'items-center',
          'justify-center',
          'gap-2',
        ])}
      >
        <span>📤</span>
        <span>Export</span>
      </button>

      <button
        onClick={handleImportClick}
        className={cn([
          'flex-1',
          'py-3',
          'px-4',
          'rounded-full',
          'bg-white',
          'border-2',
          'border-nook-border',
          'text-nook-text',
          'font-medium',
          'hover:border-nook-green',
          'transition-colors',
          'flex',
          'items-center',
          'justify-center',
          'gap-2',
        ])}
      >
        <span>📥</span>
        <span>Import</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className={cn([
          'hidden',
        ])}
      />
    </div>
  )
}
