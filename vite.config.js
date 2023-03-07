import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const target = 'https://www.camptogo.com:1443'
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true
      },

      '/media': {
        target,
        changeOrigin: true
      }
    },
    host: "localhost",
    hmr: true,
  }
})
