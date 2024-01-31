import { readFileSync, writeFileSync } from 'fs'
import { opendir } from 'fs/promises'
import { PluginOptions } from '.'

interface CssVarItem {
  name: string
  value: string
}

function getScssVar(content: string) {
  const data: CssVarItem[] = []
  const regex = /\$([a-zA-Z-]+):\s*([^;]+?);/g
  let match
  while ((match = regex.exec(content)) !== null) {
    data.push({
      name: match[1],
      value: match[2],
    })
  }
  return data
}

function getCssVar(content: string) {
  const scssVarList = getScssVar(content)

  const data: CssVarItem[] = []
  const regex = /_var\(\s*([^,\s]+)\s*,\s*([^)]+)\s*\)/g
  let match
  while ((match = regex.exec(content)) !== null) {
    let value = match[2].replace(/_var\((.+)/, 'var(--pa-$1)')
    scssVarList.forEach((scssVar) => {
      value = value.replaceAll(`$${scssVar.name}`, scssVar.value)
    })
    data.push({
      name: '--pa-' + match[1],
      value,
    })
  }
  return data
}

function cssVar2MarkdownTable(props: CssVarItem[]) {
  if (!props.length) return ':see_no_evil:'
  let tableText = '| 名称 | 默认值 |\n| --- | --- |\n'
  tableText += props
    .map((prop) => {
      return `| ${prop.name} | ${prop.value} |`
    })
    .join('\n')

  return tableText
}

async function getMarkdownTextByFileCode(sourceDirPath: string, componentName: string) {
  try {
    const cssVarList: CssVarItem[] = []
    const dir = await opendir(`${sourceDirPath}/${componentName}`)
    for await (const dirent of dir) {
      if (/.+\.scss$/.test(dirent.name)) {
        const cssContent = readFileSync(`${sourceDirPath}/${componentName}/${dirent.name}`, {
          encoding: 'utf-8',
        })
        cssVarList.push(...getCssVar(cssContent))
      }
    }
    return cssVar2MarkdownTable(cssVarList)
  } catch (err) {
    console.error(err)
  }
}

export async function main({ sourceDirPath, targetDirPath, componentDirNames }: PluginOptions) {
  for (const componentDirName of componentDirNames) {
    try {
      const propsText = await getMarkdownTextByFileCode(sourceDirPath, componentDirName)

      const mdContent = readFileSync(`${targetDirPath}/${componentDirName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--cssVar start-->).+(<!--cssVar end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentDirName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===write ${componentDirName} cssVar complete===`)
    } catch (e) {
      console.error('gen cssVar error', e)
    }
  }
}
