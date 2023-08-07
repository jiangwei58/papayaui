import { readFileSync, writeFileSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { PluginOptions } from '.'

interface SlotItem {
  name: string
  desc: string
}

function getEvent(fileContent: string, _componentDirName: string) {
  const slotList: SlotItem[] = []

  const regex = /<template\b[^<]*(?:(?!<\/template>)<[^<]*)*<\/template>/gi
  const matchArray = fileContent.match(regex)
  if (!matchArray) return slotList
  const slotRegex = /<slot\b[^<]*(\/>)?(<\/slot>)?/gi
  matchArray.map((code) => {
    code.match(slotRegex)?.map((slotCode) => {
      const nameMatch = slotCode.match(/name="(.+)"/)
      slotList.push({
        name: nameMatch ? nameMatch[1] : 'default',
        desc: '-',
      })
    })
  })
  return slotList
}

function event2MarkdownTable(props: SlotItem[]) {
  let tableText = '| 名称 | 说明 |\n| --- | --- |\n'
  tableText += props
    .map((prop) => {
      return `| ${prop.name} | ${prop.desc} |`
    })
    .join('\n')

  return tableText
}

export async function main({ sourceDirPath, targetDirPath }: PluginOptions) {
  try {
    const files = await readdir(sourceDirPath)
    for (const componentDirName of files) {
      if (componentDirName === 'index.ts') continue

      const filePath = `${sourceDirPath}/${componentDirName}/${componentDirName}.vue`
      const fileCode = await readFile(filePath, { encoding: 'utf-8' }).catch(() => null)
      if (!fileCode) continue

      const propsText = event2MarkdownTable(getEvent(fileCode, componentDirName))

      const mdContent = readFileSync(`${targetDirPath}/${componentDirName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--slot start-->).+(<!--slot end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentDirName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===写入 ${componentDirName} slot 完成===`)
    }
  } catch (e) {
    console.error('gen slot error', e)
  }
}
