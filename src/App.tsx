import { useState, useCallback } from 'react'
import type { Item, Category } from './lib/types'
import { useItems } from './hooks/useItems'
import { SearchBar } from './components/SearchBar'
import { ExpiringSection } from './components/ExpiringSection'
import { ItemList } from './components/ItemList'
import { ItemSheet } from './components/ItemSheet'
import { ItemDetail } from './components/ItemDetail'
import { Fab } from './components/Fab'

export default function App() {
  const { items, settings, loading, addItem, updateItem, deleteItem } = useItems()

  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState<string | null>(null)

  const [sheetOpen, setSheetOpen] = useState(false)
  const [editItem, setEditItem] = useState<Item | null>(null)

  const [detailItem, setDetailItem] = useState<Item | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleItemClick = useCallback((item: Item) => {
    setDetailItem(item)
    setDetailOpen(true)
  }, [])

  const handleEdit = useCallback((item: Item) => {
    setEditItem(item)
    setSheetOpen(true)
  }, [])

  const handleSave = useCallback(
    async (data: { name: string; category: Category; location: string; expiryDate?: string }) => {
      if (editItem) {
        await updateItem({ ...editItem, ...data })
      } else {
        await addItem(data)
      }
      setEditItem(null)
    },
    [editItem, addItem, updateItem],
  )

  const handleBack = useCallback(() => {
    setSearchActive(false)
    setSearchQuery('')
    setLocationFilter(null)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-muted text-sm font-light">Loading...</span>
      </div>
    )
  }

  const isSearching = searchActive || searchQuery.length > 0

  return (
    <div className="min-h-full max-w-[600px] mx-auto pb-24 relative">
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 pt-5">
        <h1 className="text-[28px] font-light tracking-tight">Stuff</h1>
      </div>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        active={isSearching}
        onFocus={() => setSearchActive(true)}
        onBack={handleBack}
      />

      {/* Content */}
      {isSearching ? (
        <ItemList
          items={items}
          query={searchQuery}
          locations={settings.locations}
          locationFilter={locationFilter}
          onLocationFilter={setLocationFilter}
          onItemClick={handleItemClick}
        />
      ) : (
        <>
          <ExpiringSection items={items} onItemClick={handleItemClick} />

          {items.length === 0 && (
            <div className="text-center text-muted text-sm font-light mt-20 px-6">
              <p>No items yet.</p>
              <p className="mt-1">Tap + to add your first item.</p>
            </div>
          )}
        </>
      )}

      {/* FAB */}
      <Fab
        onClick={() => {
          setEditItem(null)
          setSheetOpen(true)
        }}
      />

      {/* Add/Edit Sheet */}
      <ItemSheet
        open={sheetOpen}
        onClose={() => {
          setSheetOpen(false)
          setEditItem(null)
        }}
        onSave={handleSave}
        editItem={editItem}
        locations={settings.locations}
      />

      {/* Detail Sheet */}
      <ItemDetail
        item={detailItem}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEdit={handleEdit}
        onDelete={deleteItem}
      />
    </div>
  )
}
