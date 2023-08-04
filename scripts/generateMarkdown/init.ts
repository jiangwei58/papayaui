import { access, readdir, writeFile } from 'fs/promises'
import { PluginOptions } from '.'

export const getTag = (tagName: string, start = true) => {
  return `<!--${tagName} ${start ? 'start' : 'end'}-->`
}

export async function main({ sourceDirPath, targetDirPath }: PluginOptions) {
  try {
    const files = await readdir(sourceDirPath)
    for (const componentName of files) {
      if (componentName === 'index.ts') continue
      const path = `${targetDirPath}/${componentName}.md`
      await access(path).catch(() => {
        const markdownText =
          `# ${componentName}\n\n` +
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
