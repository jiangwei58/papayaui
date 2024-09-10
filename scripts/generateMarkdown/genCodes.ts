import { readFileSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { PluginOptions } from '.'

interface CodeItem {
  title: string
  list: Array<{
    type: string
    lang: string
    code: string
  }>
}

const getTagAttrRegexp = (tagName: string, attrName: string) => {
  return new RegExp(
    `<${tagName}(?:[^'">]*(?:"[^"]*"|'[^']*')(?<! ${attrName}=))*[^'">]* ${attrName}=(?:'([^']+)'|"([^"]+)"|([^'" <>]+)).*(?:>[^<>]*<\\/${tagName}|\\/)>`,
  )
}

function getDemos(fileContent: string, demoDirPath: string, componentDirName: string) {
  const matchArray =
    fileContent.match(/<DocDemoBlock\b[^<]*(?:(?!<\/DocDemoBlock>)<[^<]*)*<\/DocDemoBlock>/gi) ?? []

  return matchArray.flatMap((code) => {
    let title = code.match(/title="(.+)"/)?.[1] ?? ''
    const demoMatch = code.match(/<Demo(\d{1,2})\s\/>/g) ?? []
    return demoMatch.map((demoTag) => {
      const demoIndex = demoTag.replace(/\D/g, '') || '0'
      const demoFileContent = readFileSync(
        `${demoDirPath}/${componentDirName}/demo-${demoIndex}.vue`,
        {
          encoding: 'utf-8',
        },
      )
      if (demoMatch.length > 1) {
        title = demoFileContent.match(getTagAttrRegexp('pa-cell', 'title'))?.[2] ?? ''
      }
      return getCodes(title, demoFileContent, componentDirName)
    })
  })
}

function getCodes(title: string, fileContent: string, _componentDirName: string) {
  const data: CodeItem = {
    title,
    list: [],
  }

  for (const blockItem of [
    ['template', 'html'],
    ['script', 'ts'],
  ]) {
    const type = blockItem[0]
    const codeMatch = fileContent.match(new RegExp(`<${type}[^>]*>([\\s\\S]+)<\\/${type}>`))
    if (!codeMatch) continue
    let code = codeMatch[1]
    if (type === 'template') {
      code = code.replace(/^\x20{2}/gm, '')
    }
    data.list.push({
      type,
      lang: blockItem[1],
      code,
    })
  }
  return data
}

function code2Markdown(codes: CodeItem[]) {
  const text = codes
    .map((item) => {
      return (
        `## ${item.title}\n\n` +
        item.list
          .map((item) => `\`\`\`${item.lang} [${item.type}]` + `\n${item.code}\n` + `\`\`\``)
          .join('\n')
      )
    })
    .join('\n')

  return text
}

export async function main({ targetDirPath, demoDirPath, componentDirNames }: PluginOptions) {
  try {
    for (const componentDirName of componentDirNames) {
      const filePath = resolve(demoDirPath, `./${componentDirName}/index.vue`)
      const fileCode = await readFile(filePath, { encoding: 'utf-8' }).catch(() => null)
      if (!fileCode) continue

      const propsText = code2Markdown(getDemos(fileCode, demoDirPath, componentDirName))

      const mdContent = readFileSync(`${targetDirPath}/${componentDirName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--codes start-->).+(<!--codes end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentDirName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===write ${componentDirName} codes complete===`)
    }
  } catch (e) {
    console.error('gen codes error', e)
  }
}
