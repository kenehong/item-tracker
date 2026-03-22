interface ChipProps {
  label: string
  selected?: boolean
  dashed?: boolean
  onClick?: () => void
}

export function Chip({ label, selected, dashed, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center px-4 py-2 text-[13px] font-normal
        rounded-chip transition-colors duration-150 min-h-[36px]
        ${
          selected
            ? 'bg-primary text-white dark:text-black border border-primary'
            : dashed
              ? 'bg-surface text-muted border border-dashed border-border'
              : 'bg-surface text-muted border border-border'
        }
      `}
    >
      {label}
    </button>
  )
}
