import assert from 'node:assert'
import { readFileSync, writeFileSync } from 'node:fs'
import { open } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Node, Project, PropertyAssignment, SourceFile } from 'ts-morph'
import { PluginOptions, getCamelCaseName } from '.'
import { SpreadAssignment } from 'ts-morph'

interface PropItem {
  name: string
  type: string
  desc: string
  default?: string
}

function initTsProject() {
  return new Project({
    tsConfigFilePath: './tsconfig.json',
  })
}

function getPropType(property: PropertyAssignment) {
  const typeNode = property.getChildAtIndex(3)

  const type2Text = (node: Node | undefined) => {
    // 单个类型
    if (Node.isIdentifier(node)) {
      return node.getText().toLowerCase()
    }
    // 数组类型
    if (Node.isArrayLiteralExpression(node)) {
      return node
        .getText()
        .replace(/\[|\]/g, '')
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .join(' | ')
    }
    // 特别指定类型，即使用了 PropType
    if (Node.isAsExpression(node)) {
      return (
        node
          .getTypeNode()
          ?.getText()
          .replace(/\s/g, '')
          .replace(/PropType<(.+)>/, '$1') ?? ''
      )
    }
    return ''
  }

  if (Node.isObjectLiteralExpression(typeNode)) {
    return type2Text(typeNode.getProperty('type')?.getChildAtIndex(2))
  } else {
    return type2Text(typeNode)
  }
}

function getPropDefaultValue(property: PropertyAssignment) {
  const typeNode = property.getChildAtIndex(3)
  if (Node.isObjectLiteralExpression(typeNode)) {
    const text = typeNode.getProperty('default')?.getChildAtIndex(2).getFullText()
    return text?.indexOf('() => {') === -1 ? text?.replace('${defaultNamespace}', 'pa') : undefined
  }
}

function getProps(sourceFile: SourceFile, componentName: string) {
  const kebabCaseName = getCamelCaseName(componentName)
  const propsDeclaration = sourceFile.getVariableDeclaration(`${kebabCaseName}Props`)
  if (!propsDeclaration) {
    console.warn(componentName, '没有声明props')
    return []
  }
  const initializer = propsDeclaration.getInitializer()
  let objectLiteralExpression = initializer
  if (Node.isAsExpression(objectLiteralExpression)) {
    objectLiteralExpression = objectLiteralExpression.getExpression()
  }
  assert(Node.isObjectLiteralExpression(objectLiteralExpression), 'props不是对象')

  // 获取组件参数字段
  const propList: PropItem[] = []
  objectLiteralExpression.getProperties().forEach((property) => {
    if (Node.isSpreadAssignment(property)) {
      propList.push(...getSpreadProps(sourceFile, property))
    }
    if (!Node.isPropertyAssignment(property)) {
      console.warn(componentName, 'property不是属性')
      return
    }
    // 获取属性名
    const propertyName = property.getName()

    // 获取属性的类型
    const propertyType = getPropType(property)

    // 获取属性的 JSDoc 描述
    const jsDocNode = property.getChildAtIndex(0)
    let jsDocDescription = ''
    if (Node.isJSDoc(jsDocNode)) {
      jsDocDescription = jsDocNode.getDescription().trim()
    }

    propList.push({
      name: propertyName,
      type: propertyType,
      desc: jsDocDescription,
      default: getPropDefaultValue(property),
    })
  })
  return propList
}

function getSpreadProps(sourceFile: SourceFile, node: SpreadAssignment): PropItem[] {
  if (Node.isIdentifier(node.getExpression())) {
    return getProps(sourceFile, node.getExpression().getText().replace('Props', ''))
  }
  return []
}

function props2MarkdownTable(props: PropItem[]) {
  let tableText = '| 参数 | 说明 | 类型 | 默认值 |\n| --- | ----- | --- | --- |\n'
  tableText += props
    .map((prop) => {
      const typeText = prop.type.replace(/([|<>])/g, '\\$1')
      return `| ${prop.name} | ${prop.desc} | ${typeText} | ${prop.default ?? '-'} |`
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
      const text = props2MarkdownTable(getProps(sourceFile, componentName))
      sourceFile.delete()
      return text
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
          propsText += `\n\n## ${getCamelCaseName(relevanceName, true)} Props\n\n${relevanceText}`
        }
      }

      const mdContent = readFileSync(`${targetDirPath}/${componentName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--props start-->).+(<!--props end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${targetDirPath}/${componentName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`===write ${componentName} props complete===`)
    } catch (e) {
      console.error(componentName, 'gen props error', e)
    }
  }
}
