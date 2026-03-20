import type { Item } from '../lib/types'
import { getExpiringItems } from '../lib/utils'
import { ItemCard } from './ItemCard'

interface ExpiringSectionProps {
  items: Item[]
  onItemClick: (item: Item) => void
}

export function ExpiringSection({ items, onItemClick }: ExpiringSectionProps) {
  const expiring = getExpiringItems(items)

  if (expiring.length === 0) return null

  return (
    <div className="px-6">
      <h3 className="text-[11px] font-normal text-muted uppercase tracking-wider mt-8 mb-3">
        Expiring Soon
      </h3>
      <div>
        {expiring.map((item) => (
          <ItemCard key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  )
}
