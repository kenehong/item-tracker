import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isCapacitor = mode === 'capacitor'
  const basePath = isCapacitor ? '/' : '/item-tracker/'

  return {
    base: basePath,
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          landing: 'landing.html',
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icons/icon-192.svg', 'icons/icon-512.svg'],
        manifest: {
          name: 'Stuff - Item Tracker',
          short_name: 'Stuff',
          description: 'Track where your stuff is stored at home',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: basePath,
          scope: basePath,
          icons: [
            {
              src: 'icons/icon-192.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: 'icons/icon-512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
  }
})
