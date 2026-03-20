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

  return (
    <div className={`px-6 ${active ? 'mt-4' : 'mt-20'} mb-3 transition-all duration-200`}>
      <div
        className={`
          w-full flex items-center gap-2.5 px-4
          rounded-default bg-surface border border-border
          ${active ? 'h-[52px] text-base' : 'h-[56px] text-[17px]'}
        `}
      >
        {active ? (
          <button
            type="button"
            onClick={onBack}
            className="text-muted text-lg shrink-0 p-1"
            aria-label="Back"
          >
            &larr;
          </button>
        ) : (
          <span className="text-[#cccccc] text-base shrink-0">&#9906;</span>
        )}

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder="Search items..."
          className="
            flex-1 bg-transparent outline-none
            font-light text-text placeholder:text-muted
          "
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[#cccccc] text-sm p-1"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  )
}
