import { defineConfig } from 'vite'
import MarkdownTransform from './plugins/markdown-transform'

export default defineConfig({
  server: {
    fs: {
      // 允许为项目根目录的上一级提供服务
      allow: ['..'],
    },
  },
  plugins: [MarkdownTransform()],
})
