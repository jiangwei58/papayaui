import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  build: {
    watch: {
      chokidar: {
        followSymlinks: false,
        ignored: ['!**/node_modules/papayaui/**'],
      },
    },
  },
})
