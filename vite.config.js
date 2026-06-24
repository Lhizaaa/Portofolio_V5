import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split heavy third-party libraries into their own cacheable chunks
        // so the initial page load doesn't have to download everything at once.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('@mui') ||
            id.includes('@emotion') ||
            id.includes('react-swipeable-views')
          )
            return 'mui'
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('@supabase')) return 'supabase'
          if (id.includes('sweetalert2')) return 'sweetalert'
          if (id.includes('aos')) return 'aos'
          if (
            id.includes('/react-dom/') ||
            id.includes('/react-router') ||
            id.includes('/react/') ||
            id.includes('/scheduler/')
          )
            return 'react-vendor'
          return 'vendor'
        },
      },
    },
  },
})
