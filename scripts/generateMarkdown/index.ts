import path from 'path'
import { fileURLToPath } from 'url'
import { main as genPropsMain } from './genProps'
import { main as initMain } from './init'
import { main as genEventMain } from './genEvent'
import { main as genSlotMain } from './genSlot'

export interface PluginOptions {
  sourceDirPath: string
  targetDirPath: string
}

export function getCamelCaseName(name: string, firstUpperCase = false) {
  return name
    .replace('btns', 'buttons')
    .split('-')
    .reduce((result, cur, index) => {
      return (
        result +
        (index === 0
          ? cur[0][firstUpperCase ? 'toUpperCase' : 'toLowerCase']()
          : cur[0].toUpperCase()) +
        cur.slice(1)
      )
    }, '')
}

async function main() {
  const __filename = fileURLToPath(import.meta.url)
  const directoryPath = path.resolve(__filename, '../../../src/packages/components')
  const docDirectoryPath = path.resolve(__filename, '../../../docs/components')

  const params = {
    sourceDirPath: directoryPath,
    targetDirPath: docDirectoryPath,
  }

  await initMain(params)

  await genPropsMain(params)

  await genEventMain(params)

  await genSlotMain(params)

  console.log('generate completed')
}

main()
