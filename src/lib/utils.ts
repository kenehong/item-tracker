import { differenceInDays, parseISO, format } from 'date-fns'
import type { Item } from './types'

export function getDDay(expiryDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = parseISO(expiryDate)
  return differenceInDays(expiry, today)
}

export function getDDayLabel(dday: number): string {
  if (dday < 0) return 'Expired'
  if (dday === 0) return 'Today'
  return `D-${dday}`
}

export type Urgency = 'expired' | 'danger' | 'warning' | 'normal' | 'none'

export function getUrgency(expiryDate?: string): Urgency {
  if (!expiryDate) return 'none'
  const dday = getDDay(expiryDate)
  if (dday < 0) return 'expired'
  if (dday <= 1) return 'danger'
  if (dday <= 7) return 'warning'
  return 'normal'
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d, yyyy')
}

export function getExpiringItems(items: Item[], withinDays = 7): Item[] {
  return items
    .filter((item) => {
      if (!item.expiryDate) return false
      const dday = getDDay(item.expiryDate)
      return dday <= withinDays
    })
    .sort((a, b) => {
      const ddayA = getDDay(a.expiryDate!)
      const ddayB = getDDay(b.expiryDate!)
      return ddayA - ddayB
    })
}

export function searchItems(items: Item[], query: string, locationFilter?: string): Item[] {
  const q = query.toLowerCase().trim()
  return items.filter((item) => {
    const matchesQuery =
      !q || item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q)
    const matchesLocation = !locationFilter || item.location === locationFilter
    return matchesQuery && matchesLocation
  })
}
