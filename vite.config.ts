import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Сайт на GitHub Pages открывается по адресу /list/ (имя репозитория)
  base: '/list/',
})
