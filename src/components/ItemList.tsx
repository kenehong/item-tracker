import type { Item } from '../lib/types'
import { searchItems } from '../lib/utils'
import { ItemCard } from './ItemCard'

interface ItemListProps {
  items: Item[]
  query: string
  locationFilter: string | null
  onItemClick: (item: Item) => void
}

export function ItemList({
  items,
  query,
  locationFilter,
  onItemClick,
}: ItemListProps) {
  const filtered = searchItems(items, query, locationFilter ?? undefined)

  return (
    <div>
      {/* Results */}
      <div className="px-6 mt-4">
        {filtered.length === 0 ? (
          <div className="text-center text-muted text-sm font-light py-16">No items found</div>
        ) : (
          <>
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} onClick={onItemClick} />
            ))}
            <div className="text-center text-muted text-xs font-light mt-12">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
            </div>
          </>
        )}
      </div>
    </div>
  )
}
