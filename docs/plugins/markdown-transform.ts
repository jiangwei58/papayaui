import { JSDocableNode, Project } from 'ts-morph'
import ts from 'typescript'
import { Plugin } from 'vite'
import fs from 'fs'

interface PropItem {
  name: string
  type: string
  desc: string
}

const tsProject = new Project({
  tsConfigFilePath: './tsconfig.json',
})

const getScriptContentFromVueFile = (fileContent: string) => {
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
  const contentRegex = /(?<=<script lang="ts" setup>)[\s\S]*(?=<\/script>)/i
  const scriptTags = fileContent.match(scriptRegex)
  if (!scriptTags) return ''
  const scriptContents = scriptTags.map((tag) => {
    const match = tag.match(contentRegex)
    return Array.isArray(match) ? match[0] : ''
  })
  return scriptContents
}

export default function generateMarkdown(): Plugin {
  return {
    name: 'generate-markdown',
    enforce: 'pre',
    transform(code, id, _options) {
      // 过滤component下文件
      if (!/\/components\/.+\.vue$/.test(id)) return
      const componentName = id.replace(/\S+\/components\/([A-Za-z-]+)\/.+\.vue/, '$1')
      // 过滤和文件夹同名组件
      if (!new RegExp(`/components/${componentName}/${componentName}.vue`).test(id)) return

      const scriptCode = getScriptContentFromVueFile(code)[0]
      const sourceFile = tsProject.createSourceFile(componentName + '.ts', scriptCode, {
        scriptKind: ts.ScriptKind.TS,
      })

      // 组件interface名称规则一致
      const interfaceName = componentName[0].toUpperCase() + componentName.slice(1) + 'Props'
      // 获取组件参数字段
      const propList: PropItem[] = []
      const interfaceDeclaration = sourceFile.getInterface(interfaceName)
      interfaceDeclaration?.getProperties().forEach((property) => {
        // 获取属性名
        const propertyName = property.getName()

        // 获取属性的类型
        const propertyType = property.getType().getText()

        // 获取属性的 JSDoc 描述
        const jsDocDescription = (property as JSDocableNode).getJsDocs()[0]?.getDescription().trim()

        propList.push({
          name: propertyName,
          type: propertyType,
          desc: jsDocDescription,
        })
      })

      fs.writeFileSync(
        id.replace(/\.vue$/, '.md'),
        `# {{ componentName }}\n## API\n### Props\n{{ props }}\n### Events\n{{ events }}`,
      )
    },
  }
}
