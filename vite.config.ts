import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy /bdapps/* → BDApps PHP server (resolves browser CORS restriction)
      '/bdapps': {
        target: 'https://www.bdappsdigitalapps.com/NADB26115/greencare',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/bdapps/, ''),
      },
    },
  },
})

