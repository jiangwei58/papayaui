import { readFileSync, writeFileSync } from 'node:fs'
import { open } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Project, SourceFile } from 'ts-morph'
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

async function getMarkdownTextByFileCode(
  tsProject: Project,
  sourceDirPath: string,
  componentName: string,
) {
  const filePath = resolve(sourceDirPath, `./${componentName}/props.ts`)
  return open(filePath)
    .then(() => {
      const sourceFile = tsProject.addSourceFileAtPath(filePath)
      return event2MarkdownTable(getEvent(sourceFile, componentName))
    })
    .catch(() => null)
}

export async function main({
  sourceDirPath,
  targetDirPath,
  componentDirNames,
  relevanceMap,
}: PluginOptions) {
  const tsProject = initTsProject()

  for (const componentName of componentDirNames) {
    try {
      let propsText = await getMarkdownTextByFileCode(tsProject, sourceDirPath, componentName)

      for (const relevanceName of relevanceMap[componentName] ?? []) {
        const relevanceText = await getMarkdownTextByFileCode(
          tsProject,
          sourceDirPath,
          relevanceName,
        )
        if (relevanceText) {
          propsText += `\n\n## ${getCamelCaseName(relevanceName, true)} Event\n\n${relevanceText}`
        }
      }

      const mdContent = readFileSync(`${targetDirPath}/${componentName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--event start-->).+(<!--event end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===write ${componentName} event complete===`)
    } catch (e) {
      console.error('gen event error', e)
    }
  }
}
