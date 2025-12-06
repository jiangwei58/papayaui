import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // 获取当前运行的平台
  const platform = process.env.UNI_PLATFORM
  const isH5 = platform === 'h5'
  const isMiniProgram = platform?.startsWith('mp-')

  return {
    plugins: [uni()],
    // H5 开发服务器配置
    ...(isH5 && {
      server: {
        fs: {
          allow: ['..'],
        },
      },
      optimizeDeps: {
        exclude: ['papayaui'],
      },
      resolve: {
        alias: {
          papayaui: path.resolve(__dirname, '../packages/papayaui'),
        },
      },
    }),
    // 小程序构建监听配置
    ...(isMiniProgram && {
      build: {
        watch: {
          chokidar: {
            followSymlinks: false,
            ignored: ['!**/node_modules/papayaui/**'],
          },
        },
      },
    }),
  }
})
