import type { Item } from '../lib/types'
import { searchItems } from '../lib/utils'
import { Chip } from './Chip'
import { ItemCard } from './ItemCard'

interface ItemListProps {
  items: Item[]
  query: string
  locations: string[]
  locationFilter: string | null
  onLocationFilter: (loc: string | null) => void
  onItemClick: (item: Item) => void
}

export function ItemList({
  items,
  query,
  locations,
  locationFilter,
  onLocationFilter,
  onItemClick,
}: ItemListProps) {
  const filtered = searchItems(items, query, locationFilter ?? undefined)

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 px-6 mt-4 mb-2 overflow-x-auto scrollbar-none">
        <Chip label="All" selected={!locationFilter} onClick={() => onLocationFilter(null)} />
        {locations.map((loc) => (
          <Chip
            key={loc}
            label={loc}
            selected={locationFilter === loc}
            onClick={() => onLocationFilter(locationFilter === loc ? null : loc)}
          />
        ))}
      </div>

      {/* Results */}
      <div className="px-6 mt-2">
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
