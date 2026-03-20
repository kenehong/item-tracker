import type { Item } from '../lib/types'
import { getDDay, getDDayLabel, getUrgency } from '../lib/utils'

interface ItemCardProps {
  item: Item
  onClick: (item: Item) => void
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const urgency = getUrgency(item.expiryDate)
  const dday = item.expiryDate ? getDDay(item.expiryDate) : null
  const ddayLabel = dday !== null ? getDDayLabel(dday) : null

  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="
        flex items-center justify-between w-full
        py-3.5 border-b border-border text-left
        last:border-b-0
      "
      aria-label={`${item.name}, ${item.location}${ddayLabel ? `, ${ddayLabel}` : ''}`}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-normal text-text">{item.name}</span>
        <span className="text-xs font-light text-muted">{item.location}</span>
      </div>

      {ddayLabel && (
        <span
          className={`
            text-xs font-medium px-2.5 py-1 rounded-chip whitespace-nowrap
            ${
              urgency === 'expired'
                ? 'text-white bg-danger'
                : urgency === 'danger'
                  ? 'text-danger bg-danger-light'
                  : urgency === 'warning'
                    ? 'text-warning bg-warning-light'
                    : 'text-muted bg-surface'
            }
          `}
        >
          {ddayLabel}
        </span>
      )}
    </button>
  )
}
