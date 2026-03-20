import { useEffect, useRef, type ReactNode } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <div
      className={`
        fixed inset-0 z-50 transition-opacity duration-200
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`
          absolute bottom-0 left-0 right-0 bg-bg
          rounded-t-[16px] max-h-[85vh] overflow-y-auto
          transition-transform duration-300 ease-out
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        {/* Handle */}
        <div className="flex justify-center pt-2.5 pb-4">
          <div className="w-9 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex justify-between items-center px-6 mb-6">
            <h3 className="text-lg font-normal tracking-tight">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-lg text-muted p-2 -mr-2"
            >
              &times;
            </button>
          </div>
        )}

        <div className="px-6 pb-8">{children}</div>
      </div>
    </div>
  )
}
