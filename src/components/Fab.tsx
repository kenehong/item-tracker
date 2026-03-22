interface FabProps {
  onClick: () => void
}

export function Fab({ onClick }: FabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add item"
      className="
        fixed bottom-7 right-6 w-[52px] h-[52px] rounded-full
        bg-primary text-white dark:text-black flex items-center justify-center
        text-2xl font-light shadow-lg active:scale-95 transition-transform
        z-40
      "
    >
      +
    </button>
  )
}
