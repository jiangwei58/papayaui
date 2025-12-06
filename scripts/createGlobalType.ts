import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const main = () => {
  const filePath = path.resolve(__dirname, '../typings/components.d.ts')
  let dataStr = fs.readFileSync(filePath).toString()

  // 将相对路径替换为以 papayaui 开头的绝对路径
  dataStr = dataStr.replace(/\.\.\/packages\/papayaui\/components\//g, 'papayaui/components/')

  const writeFilePath = path.resolve(__dirname, '../packages/papayaui/global.d.ts')
  fs.writeFileSync(writeFilePath, dataStr)
  console.log(`created ${writeFilePath} completed`)
}

main()
