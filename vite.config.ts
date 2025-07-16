// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'composables': path.resolve(__dirname, './src/composables'),
      'utils': path.resolve(__dirname, './src/lib/utils'),
      'ui': path.resolve(__dirname, './src/components/ui'),
      'lib': path.resolve(__dirname, './src/lib'),
    },
  },
})
