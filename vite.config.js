import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sass from 'sass'

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        implementation: sass,
      },
    },
  },
}