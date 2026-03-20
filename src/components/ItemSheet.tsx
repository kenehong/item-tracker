import { useState, useEffect, useRef } from 'react'
import type { Item, Category } from '../lib/types'
import { CATEGORIES } from '../lib/types'
import { BottomSheet } from './BottomSheet'
import { Chip } from './Chip'

interface ItemSheetProps {
  open: boolean
  onClose: () => void
  onSave: (data: { name: string; category: Category; location: string; expiryDate?: string }) => void
  editItem?: Item | null
  locations: string[]
}

export function ItemSheet({ open, onClose, onSave, editItem, locations }: ItemSheetProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>('food')
  const [location, setLocation] = useState('')
  const [hasExpiry, setHasExpiry] = useState(false)
  const [expiryDate, setExpiryDate] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [showNewLocation, setShowNewLocation] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      if (editItem) {
        setName(editItem.name)
        setCategory(editItem.category)
        setLocation(editItem.location)
        setHasExpiry(!!editItem.expiryDate)
        setExpiryDate(editItem.expiryDate ?? '')
      } else {
        setName('')
        setCategory('food')
        setLocation(locations[0] ?? '')
        setHasExpiry(false)
        setExpiryDate('')
      }
      setNewLocation('')
      setShowNewLocation(false)
      // Autofocus after sheet animates
      setTimeout(() => nameRef.current?.focus(), 350)
    }
  }, [open, editItem, locations])

  function handleSubmit() {
    const trimmedName = name.trim()
    if (!trimmedName) return

    const finalLocation = showNewLocation ? newLocation.trim() : location
    if (!finalLocation) return

    onSave({
      name: trimmedName,
      category,
      location: finalLocation,
      expiryDate: hasExpiry && expiryDate ? expiryDate : undefined,
    })
    onClose()
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={editItem ? 'Edit Item' : 'Add Item'}>
      {/* Name */}
      <div className="mb-5">
        <label className="block text-xs font-normal text-muted uppercase tracking-wider mb-2">
          Name
        </label>
        <input
          ref={nameRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className="
            w-full h-11 rounded-default border border-border bg-surface
            px-3.5 text-[15px] font-light text-text
            placeholder:text-muted outline-none
            focus:border-primary/30
          "
        />
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-xs font-normal text-muted uppercase tracking-wider mb-2">
          Category
        </label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.value}
              label={cat.label}
              selected={category === cat.value}
              onClick={() => setCategory(cat.value)}
            />
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-5">
        <label className="block text-xs font-normal text-muted uppercase tracking-wider mb-2">
          Location
        </label>
        <div className="flex gap-2 flex-wrap">
          {locations.map((loc) => (
            <Chip
              key={loc}
              label={loc}
              selected={!showNewLocation && location === loc}
              onClick={() => {
                setLocation(loc)
                setShowNewLocation(false)
              }}
            />
          ))}
          <Chip
            label="+ Add new"
            dashed
            selected={showNewLocation}
            onClick={() => setShowNewLocation(true)}
          />
        </div>
        {showNewLocation && (
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="New location name"
            autoFocus
            className="
              w-full h-11 rounded-default border border-border bg-surface
              px-3.5 text-[15px] font-light text-text mt-2
              placeholder:text-muted outline-none
              focus:border-primary/30
            "
          />
        )}
      </div>

      {/* Expiry Date */}
      <div className="mb-5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-normal text-muted uppercase tracking-wider">
            Expiry Date
          </label>
          <button
            type="button"
            onClick={() => setHasExpiry(!hasExpiry)}
            className={`
              w-11 h-6 rounded-full relative transition-colors duration-200
              ${hasExpiry ? 'bg-primary' : 'bg-[#e0e0e0]'}
            `}
            role="switch"
            aria-checked={hasExpiry}
          >
            <span
              className={`
                absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm
                transition-all duration-200
                ${hasExpiry ? 'right-0.5' : 'left-0.5'}
              `}
            />
          </button>
        </div>
        {hasExpiry && (
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="
              w-full h-11 rounded-default border border-border bg-surface
              px-3.5 text-[15px] font-light text-text mt-2.5
              outline-none focus:border-primary/30
            "
          />
        )}
      </div>

      {/* Save */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!name.trim() || (!location && !newLocation.trim())}
        className="
          w-full h-12 rounded-default bg-primary text-white
          text-[15px] font-normal tracking-wider mt-6
          disabled:opacity-40 active:opacity-80
          transition-opacity
        "
      >
        Save
      </button>
    </BottomSheet>
  )
}
