import { useState } from 'react'
import type { Item } from '../lib/types'
import { CATEGORIES } from '../lib/types'
import { getDDay, getDDayLabel, getUrgency, formatDate } from '../lib/utils'
import { BottomSheet } from './BottomSheet'

interface ItemDetailProps {
  item: Item | null
  open: boolean
  onClose: () => void
  onEdit: (item: Item) => void
  onDelete: (id: string) => void
}

export function ItemDetail({ item, open, onClose, onEdit, onDelete }: ItemDetailProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!item) return null

  const urgency = getUrgency(item.expiryDate)
  const dday = item.expiryDate ? getDDay(item.expiryDate) : null
  const ddayLabel = dday !== null ? getDDayLabel(dday) : null
  const categoryLabel = CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    onDelete(item!.id)
    setConfirmDelete(false)
    onClose()
  }

  function handleClose() {
    setConfirmDelete(false)
    onClose()
  }

  return (
    <BottomSheet open={open} onClose={handleClose}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-light tracking-tight">{item.name}</h2>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="text-lg text-muted p-2 -mr-2 -mt-1"
        >
          &times;
        </button>
      </div>

      <div>
        <DetailRow label="Category" value={categoryLabel} />
        <DetailRow label="Location" value={item.location} />
        {item.expiryDate && (
          <DetailRow
            label="Expiry"
            value={`${formatDate(item.expiryDate)}${ddayLabel ? ` (${ddayLabel})` : ''}`}
            danger={urgency === 'danger' || urgency === 'expired' || urgency === 'warning'}
          />
        )}
        <DetailRow label="Added" value={formatDate(item.createdAt.split('T')[0])} last />
      </div>

      <div className="flex gap-2.5 mt-6">
        <button
          type="button"
          onClick={() => {
            onEdit(item)
            handleClose()
          }}
          className="
            flex-1 h-11 rounded-default bg-surface border border-border
            text-text text-sm font-normal flex items-center justify-center
          "
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="
            flex-1 h-11 rounded-default
            text-sm font-normal flex items-center justify-center
            bg-danger-light border border-danger/30 text-danger
          "
        >
          {confirmDelete ? 'Confirm Delete' : 'Delete'}
        </button>
      </div>
    </BottomSheet>
  )
}

function DetailRow({
  label,
  value,
  danger,
  last,
}: {
  label: string
  value: string
  danger?: boolean
  last?: boolean
}) {
  return (
    <div
      className={`flex justify-between items-center py-3.5 ${last ? '' : 'border-b border-border'}`}
    >
      <span className="text-[13px] text-muted font-light">{label}</span>
      <span className={`text-sm font-normal ${danger ? 'text-warning' : 'text-text'}`}>
        {value}
      </span>
    </div>
  )
}
