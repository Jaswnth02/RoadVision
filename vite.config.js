import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/RoadVision/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
})
