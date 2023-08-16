import { readFileSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { PluginOptions, getCamelCaseName } from '.'

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

function slot2MarkdownTable(props: SlotItem[]) {
  let tableText = '| 名称 | 说明 |\n| --- | --- |\n'
  tableText += props
    .map((prop) => {
      return `| ${prop.name} | ${prop.desc} |`
    })
    .join('\n')

  return tableText
}

async function getMarkdownTextByFileCode(sourceDirPath: string, componentName: string) {
  const filePath = resolve(sourceDirPath, `./${componentName}/${componentName}.vue`)
  const fileCode = await readFile(filePath, { encoding: 'utf-8' }).catch(() => null)
  if (!fileCode) return null

  return slot2MarkdownTable(getEvent(fileCode, componentName))
}

export async function main({
  sourceDirPath,
  targetDirPath,
  componentDirNames,
  relevanceMap,
}: PluginOptions) {
  for (const componentDirName of componentDirNames) {
    try {
      let propsText = await getMarkdownTextByFileCode(sourceDirPath, componentDirName)

      for (const relevanceName of relevanceMap[componentDirName] ?? []) {
        const relevanceText = await getMarkdownTextByFileCode(sourceDirPath, relevanceName)
        if (relevanceText) {
          propsText += `\n\n## ${getCamelCaseName(relevanceName, true)} Slot\n\n${relevanceText}`
        }
      }

      const mdContent = readFileSync(`${targetDirPath}/${componentDirName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--slot start-->).+(<!--slot end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentDirName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===write ${componentDirName} slot complete===`)
    } catch (e) {
      console.error('gen slot error', e)
    }
  }
}
