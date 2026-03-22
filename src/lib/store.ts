import { get, set } from 'idb-keyval'
import type { Item, AppSettings } from './types'
import { DEFAULT_LOCATIONS } from './types'

const ITEMS_KEY = 'stuff-items'
const SETTINGS_KEY = 'stuff-settings'

const SEED_KEY = 'stuff-seeded-v2'

const SEED_ITEMS: Item[] = [
  {
    id: 'seed-1',
    name: 'Target Gift Card',
    category: 'other',
    location: 'Drawer',
    createdAt: '2026-03-22T10:00:00.000Z',
    updatedAt: '2026-03-22T10:00:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'Kids Birth Certificate',
    category: 'other',
    location: 'Storage',
    createdAt: '2026-03-22T10:00:00.000Z',
    updatedAt: '2026-03-22T10:00:00.000Z',
  },
  {
    id: 'seed-3',
    name: 'Kids Tylenol',
    category: 'medicine',
    location: 'Drawer',
    expiryDate: '2026-09-15',
    createdAt: '2026-03-22T10:00:00.000Z',
    updatedAt: '2026-03-22T10:00:00.000Z',
  },
]

export async function getItems(): Promise<Item[]> {
  const seeded = await get<boolean>(SEED_KEY)
  if (!seeded) {
    const existing = (await get<Item[]>(ITEMS_KEY)) ?? []
    if (existing.length === 0) {
      await set(ITEMS_KEY, SEED_ITEMS)
      await set(SEED_KEY, true)
      return SEED_ITEMS
    }
    await set(SEED_KEY, true)
    return existing
  }
  return (await get<Item[]>(ITEMS_KEY)) ?? []
}

export async function saveItems(items: Item[]): Promise<void> {
  await set(ITEMS_KEY, items)
}

export async function addItem(item: Item): Promise<Item[]> {
  const items = await getItems()
  items.push(item)
  await saveItems(items)
  return items
}

export async function updateItem(updated: Item): Promise<Item[]> {
  const items = await getItems()
  const idx = items.findIndex((i) => i.id === updated.id)
  if (idx === -1) throw new Error(`Item not found: ${updated.id}`)
  items[idx] = updated
  await saveItems(items)
  return items
}

export async function deleteItem(id: string): Promise<Item[]> {
  const items = await getItems()
  const filtered = items.filter((i) => i.id !== id)
  await saveItems(filtered)
  return filtered
}

export async function getSettings(): Promise<AppSettings> {
  const settings = await get<AppSettings>(SETTINGS_KEY)
  return settings ?? { locations: [...DEFAULT_LOCATIONS] }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await set(SETTINGS_KEY, settings)
}

export async function addLocation(location: string): Promise<AppSettings> {
  const settings = await getSettings()
  if (!settings.locations.includes(location)) {
    settings.locations.push(location)
    await saveSettings(settings)
  }
  return settings
}
