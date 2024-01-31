import { readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { main as genCodesMain } from './genCodes'
import { main as genEventMain } from './genEvent'
import { main as genPropsMain } from './genProps'
import { main as genSlotMain } from './genSlot'
import { main as genCssVarMain } from './genCssVar'
import { main as initMain } from './init'

export interface PluginOptions {
  sourceDirPath: string
  targetDirPath: string
  demoDirPath: string
  componentDirNames: string[]
  relevanceMap: Record<string, string[]>
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
  const demoDirectoryPath = path.resolve(__filename, '../../../src/packages/demos')

  const files = await readdir(directoryPath)
  const relevanceMap = {
    cell: ['cell-group'],
    form: ['form-item'],
    radio: ['radio-group'],
    checkbox: ['checkbox-group'],
    collapse: ['collapse-item'],
    'index-bar': ['index-anchor'],
    menu: ['menu-item'],
    sidebar: ['sidebar-item'],
    tabbar: ['tabbar-item'],
    tabs: ['tab-pane'],
  }
  const componentDirNames = files.filter(
    (name) =>
      !['index.ts', 'env-view', ...Object.values(relevanceMap).flatMap((names) => names)].includes(
        name,
      ),
  )

  const params = {
    sourceDirPath: directoryPath,
    targetDirPath: docDirectoryPath,
    demoDirPath: demoDirectoryPath,
    componentDirNames,
    relevanceMap,
  }

  await initMain(params)

  await genCodesMain(params)

  await genPropsMain(params)

  await genEventMain(params)

  await genSlotMain(params)

  await genCssVarMain(params)

  console.log('generate completed')
}

main()
