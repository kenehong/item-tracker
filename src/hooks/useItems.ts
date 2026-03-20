import { useState, useEffect, useCallback } from 'react'
import type { Item, AppSettings, Category } from '../lib/types'
import * as store from '../lib/store'

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [settings, setSettings] = useState<AppSettings>({ locations: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [loadedItems, loadedSettings] = await Promise.all([
        store.getItems(),
        store.getSettings(),
      ])
      setItems(loadedItems)
      setSettings(loadedSettings)
      setLoading(false)
    }
    load()
  }, [])

  const addItem = useCallback(
    async (data: { name: string; category: Category; location: string; expiryDate?: string }) => {
      const now = new Date().toISOString()
      const item: Item = {
        id: crypto.randomUUID(),
        name: data.name,
        category: data.category,
        location: data.location,
        expiryDate: data.expiryDate || undefined,
        createdAt: now,
        updatedAt: now,
      }
      const updated = await store.addItem(item)
      setItems(updated)

      // Auto-save location
      if (!settings.locations.includes(data.location)) {
        const newSettings = await store.addLocation(data.location)
        setSettings(newSettings)
      }
    },
    [settings.locations],
  )

  const updateItem = useCallback(
    async (item: Item) => {
      const updated = { ...item, updatedAt: new Date().toISOString() }
      const newItems = await store.updateItem(updated)
      setItems(newItems)

      if (!settings.locations.includes(item.location)) {
        const newSettings = await store.addLocation(item.location)
        setSettings(newSettings)
      }
    },
    [settings.locations],
  )

  const deleteItem = useCallback(async (id: string) => {
    const updated = await store.deleteItem(id)
    setItems(updated)
  }, [])

  return { items, settings, loading, addItem, updateItem, deleteItem }
}
