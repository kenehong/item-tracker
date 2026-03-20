export type Category = 'food' | 'medicine' | 'household' | 'other'

export interface Item {
  id: string
  name: string
  category: Category
  location: string
  expiryDate?: string   // ISO date string e.g. "2026-03-22"
  createdAt: string     // ISO datetime
  updatedAt: string     // ISO datetime
}

export interface AppSettings {
  locations: string[]
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'household', label: 'Household' },
  { value: 'other', label: 'Other' },
]

export const DEFAULT_LOCATIONS = ['Fridge', 'Drawer', 'Storage']
