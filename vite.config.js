import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // ESTA LÍNEA ES LA QUE FALTA Y CORRIGE LA PANTALLA EN BLANCO:
  base: '/CERTIFIXSAS/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})