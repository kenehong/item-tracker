import { useRef, useEffect } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  active: boolean
  onFocus: () => void
  onBack: () => void
}

export function SearchBar({ value, onChange, active, onFocus, onBack }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus()
    }
  }, [active])

  if (!active) {
    return (
      <button
        type="button"
        onClick={onFocus}
        aria-label="Search"
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:bg-surface active:scale-95 transition-transform"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    )
  }

  return (
    <div className="px-6 mt-4 mb-3">
      <div className="w-full flex items-center gap-2.5 px-4 h-[48px] rounded-default bg-surface border border-border">
        <button
          type="button"
          onClick={onBack}
          className="text-muted text-lg shrink-0 p-1"
          aria-label="Back"
        >
          &larr;
        </button>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search items..."
          className="flex-1 bg-transparent outline-none font-light text-text placeholder:text-muted text-[15px]"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-muted text-sm p-1"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  )
}
