import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 使用 node 环境
    environment: 'node',

    // 启用全局变量
    globals: true,

    // 设置 setup 文件
    setupFiles: ['./vitest.setup.ts'],
  },
})
