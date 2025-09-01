/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Chord-Lab/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
