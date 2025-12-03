// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 1. Import the tailwindcss plugin
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 2. Add tailwindcss() to your plugins array
  plugins: [react(), tailwindcss()], 
})