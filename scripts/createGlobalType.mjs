import fs from 'fs'
import url from 'url'
import path from 'path'

const main = () => {
  const filePath = path.resolve(url.fileURLToPath(import.meta.url), '../../typings/components.d.ts')
  let dataStr = fs.readFileSync(filePath).toString()

  dataStr = dataStr
    .replace(`module 'vue'`, `module '@vue/runtime-core'`)
    .replaceAll('../src/packages', 'papayaui')

  const writeFilePath = path.resolve(
    url.fileURLToPath(import.meta.url),
    '../../src/packages/global.d.ts',
  )
  fs.writeFileSync(writeFilePath, dataStr)
  console.log(`created ${writeFilePath} completed`)
}

main()
