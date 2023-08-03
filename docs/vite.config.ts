import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      // 允许为项目根目录的上一级提供服务
      allow: ['..'],
    },
  },
})
