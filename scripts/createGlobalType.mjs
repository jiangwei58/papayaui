import fs from 'fs'
import url from 'url'
import path from 'path'

const main = () => {
  const filePath = path.resolve(url.fileURLToPath(import.meta.url), '../../typings/components.d.ts')
  const dataStr = fs.readFileSync(filePath).toString()

  const writeFilePath = path.resolve(
    url.fileURLToPath(import.meta.url),
    '../../src/packages/components.d.ts',
  )
  fs.writeFileSync(writeFilePath, dataStr.replaceAll('../src/packages', 'papayaui'))
  console.log(`created ${writeFilePath} completed`)
}

main()
