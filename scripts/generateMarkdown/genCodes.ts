import { readFileSync, writeFileSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { PluginOptions } from '.'

interface CodeItem {
  name: string
  code: string
  type: string
}

function getCodes(fileContent: string, _componentDirName: string) {
  const codeList: CodeItem[] = []

  const getRegexp = (blockName: string) => {
    return new RegExp(`<${blockName}\\b.*<\\/${blockName}>`, 's')
  }
  for (const blockItem of [
    ['template', 'html'],
    ['script', 'ts'],
  ]) {
    const matchArray = fileContent.match(getRegexp(blockItem[0]))
    if (!matchArray) continue
    matchArray.map((code) => {
      codeList.push({
        name: blockItem[0],
        type: blockItem[1],
        code,
      })
    })
  }
  return codeList
}

function code2Markdown(codes: CodeItem[]) {
  let text = '::: code-group\n\n'
  text += codes
    .map((item) => {
      return `\`\`\`${item.type} [${item.name}]\n${item.code}\n\`\`\``
    })
    .join('\n')

  return text
}

export async function main({ sourceDirPath, targetDirPath }: PluginOptions) {
  try {
    const files = await readdir(sourceDirPath)
    for (const componentDirName of files) {
      if (componentDirName === 'index.ts') continue

      const filePath = `${sourceDirPath}/${componentDirName}/demo.vue`
      const fileCode = await readFile(filePath, { encoding: 'utf-8' }).catch(() => null)
      if (!fileCode) continue

      const propsText = code2Markdown(getCodes(fileCode, componentDirName))

      const mdContent = readFileSync(`${targetDirPath}/${componentDirName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--codes start-->).+(<!--codes end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentDirName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===写入 ${componentDirName} codes 完成===`)
    }
  } catch (e) {
    console.error('gen codes error', e)
  }
}
