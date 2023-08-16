import { access, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { PluginOptions, getCamelCaseName } from '.'

export const getTag = (tagName: string, start = true) => {
  return `<!--${tagName} ${start ? 'start' : 'end'}-->`
}

export async function main({ targetDirPath, componentDirNames }: PluginOptions) {
  try {
    for (const componentName of componentDirNames) {
      const path = resolve(targetDirPath, `./${componentName}.md`)
      await access(path).catch(() => {
        const markdownText =
          `# ${getCamelCaseName(componentName, true)}\n\n` +
          `## 示例\n\n${getTag('codes')}\n${getTag('codes', false)}\n\n` +
          `## Props\n\n${getTag('props')}\n${getTag('props', false)}\n\n` +
          `## Event\n\n${getTag('event')}\n${getTag('event', false)}\n\n` +
          `## Slot\n\n${getTag('slot')}\n${getTag('slot', false)}\n\n`

        return writeFile(path, markdownText, { encoding: 'utf-8' }).then(() => {
          console.log(`create ${componentName}.md completed`)
        })
      })
    }
  } catch (e) {
    console.error('init error:', e)
  }
}
