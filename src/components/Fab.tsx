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
        fixed bottom-7 right-6 h-[48px] rounded-full px-5
        bg-primary text-white dark:text-black flex items-center gap-2
        text-[14px] font-normal shadow-lg active:scale-95 transition-transform
        z-40
      "
    >
      <span className="text-lg font-light leading-none">+</span>
      Add Item
    </button>
  )
}
