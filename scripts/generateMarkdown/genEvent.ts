import { readFileSync, writeFileSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Project, SourceFile } from 'ts-morph'
import ts from 'typescript'
import { PluginOptions, getCamelCaseName } from '.'

interface EventItem {
  name: string
  params: string
}

function initTsProject() {
  const tsProject = new Project({
    tsConfigFilePath: './tsconfig.json',
  })
  return tsProject
}

function getEvent(sourceFile: SourceFile, componentDirName: string) {
  const eventList: EventItem[] = []
  const componentName = getCamelCaseName(componentDirName, true)
  const typeAliasDeclaration = sourceFile.getTypeAlias(`${componentName}Emits`)
  if (!typeAliasDeclaration) {
    console.warn(`${componentName}Emits 不存在`)
    return eventList
  }

  typeAliasDeclaration
    .getType()
    .getProperties()
    .forEach((property) => {
      eventList.push({
        name: property.getName(),
        params:
          property
            .getValueDeclaration()
            ?.getChildAtIndex(2)
            .getText()
            .replace(/=>\s.+/, '')
            .replace(/_([A-Za-z]+:)/g, '$1') ?? '',
      })
    })
  return eventList
}

function event2MarkdownTable(props: EventItem[]) {
  let tableText = '| 事件名 | 参数 |\n| --- | --- |\n'
  tableText += props
    .map((prop) => {
      const typeText = prop.params.replace(/([|<>])/g, '\\$1')
      return `| ${prop.name} | ${typeText} |`
    })
    .join('\n')

  return tableText
}

export async function main({ sourceDirPath, targetDirPath }: PluginOptions) {
  const tsProject = initTsProject()

  try {
    const files = await readdir(sourceDirPath)
    for (const componentDirName of files) {
      if (componentDirName === 'index.ts') continue

      const filePath = resolve(sourceDirPath, `./${componentDirName}/props.ts`)
      const fileCode = await readFile(filePath, { encoding: 'utf-8' }).catch(() => null)
      if (!fileCode) continue

      const sourceFile = tsProject.createSourceFile(componentDirName + '.ts', fileCode, {
        scriptKind: ts.ScriptKind.TS,
      })

      const propsText = event2MarkdownTable(getEvent(sourceFile, componentDirName))

      const mdContent = readFileSync(`${targetDirPath}/${componentDirName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--event start-->).+(<!--event end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentDirName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===写入 ${componentDirName} event 完成===`)
    }
  } catch (e) {
    console.error('gen event error', e)
  }
}
