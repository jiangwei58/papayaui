import assert from 'node:assert'
import { readFileSync, writeFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'path'
import { Node, Project, PropertyAssignment, SourceFile } from 'ts-morph'
import ts from 'typescript'
import url from 'url'

interface PropItem {
  name: string
  type: string
  desc: string
  default?: string
}

function initTsProject() {
  const tsProject = new Project({
    tsConfigFilePath: './tsconfig.json',
  })
  return tsProject
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
    return typeNode
      .getProperty('default')
      ?.getChildAtIndex(2)
      .getFullText()
      .replace('${defaultNamespace}', 'pa')
  }
}

function getProps(sourceFile: SourceFile, componentName: string) {
  const propsDeclaration = sourceFile.getVariableDeclaration(`${componentName}Props`)
  if (!propsDeclaration) {
    console.warn('没有声明props')
    return []
  }
  const initializer = propsDeclaration.getInitializer()
  assert(Node.isObjectLiteralExpression(initializer), 'props不是对象')

  // 获取组件参数字段
  const propList: PropItem[] = []
  initializer.getProperties().forEach((property) => {
    assert(Node.isPropertyAssignment(property), 'props不是属性')
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

function props2MarkdownTable(props: PropItem[]) {
  let tableText = '| 参数 | 说明 | 类型 | 默认值 |\n| --- | ----- | --- | --- |\n'
  tableText += props
    .map((prop) => {
      return `| ${prop.name} | ${prop.desc} | ${prop.type.replace(/\|/g, '\\|')} | ${
        prop.default ?? '-'
      } |`
    })
    .join('\n')

  return tableText
}

async function main() {
  const tsProject = initTsProject()

  const directoryPath = path.resolve(
    url.fileURLToPath(import.meta.url),
    '../../src/packages/components',
  )

  const docDirectoryPath = path.resolve(url.fileURLToPath(import.meta.url), '../../docs/components')

  try {
    const files = await readdir(directoryPath)
    for (const componentName of files) {
      if (componentName === 'index.ts') continue

      if (componentName !== 'badge') continue

      console.log('componentName', componentName)

      const filePath = `${directoryPath}/${componentName}/props.ts`
      const fileCode = readFileSync(filePath, { encoding: 'utf-8' })
      const sourceFile = tsProject.createSourceFile(componentName + '.ts', fileCode, {
        scriptKind: ts.ScriptKind.TS,
      })

      const propsText = props2MarkdownTable(getProps(sourceFile, componentName))

      const mdContent = readFileSync(`${docDirectoryPath}/${componentName}.md`, {
        encoding: 'utf-8',
      })
      const newMdContent = mdContent.replace(
        /(<!--props start-->).+(<!--props end-->)/s,
        `$1\n\n${propsText}\n\n$2`,
      )
      writeFileSync(`${docDirectoryPath}/${componentName}.md`, newMdContent, { encoding: 'utf-8' })
      console.log(`写入 ${componentName} props 完成`)
    }
  } catch (e) {
    console.error(e)
  }
}

main()
