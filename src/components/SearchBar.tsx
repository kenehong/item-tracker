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
        className="text-muted text-lg p-2 -mr-2"
      >
        &#9906;
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
