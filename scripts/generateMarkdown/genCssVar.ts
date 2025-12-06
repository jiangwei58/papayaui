import { readFileSync, writeFileSync } from 'fs'
import { opendir } from 'fs/promises'
import { compileString } from 'sass'
import path from 'path'
import { PluginOptions } from '.'

interface CssVarItem {
  name: string
  value: string
}

/**
 * 提取 var() 函数中的变量名和默认值（支持嵌套）
 * 例如: var(--pa-badge-color, var(--pa-color-danger))
 */
function parseVarFunction(
  css: string,
  startIndex: number,
): { varName: string; defaultValue: string | null; endIndex: number } | null {
  // 跳过 'var('
  let i = startIndex + 4

  // 提取变量名
  let varName = ''
  while (i < css.length && css[i] !== ',' && css[i] !== ')') {
    varName += css[i]
    i++
  }
  varName = varName.trim()

  // 如果没有逗号，说明没有默认值
  if (css[i] === ')') {
    return { varName, defaultValue: null, endIndex: i }
  }

  // 跳过逗号和空格
  i++
  while (i < css.length && /\s/.test(css[i])) {
    i++
  }

  // 提取默认值（可能包含嵌套的 var()）
  let defaultValue = ''
  let depth = 1 // 括号深度

  while (i < css.length && depth > 0) {
    if (css[i] === '(') {
      depth++
    } else if (css[i] === ')') {
      depth--
      if (depth === 0) {
        break
      }
    }
    defaultValue += css[i]
    i++
  }

  defaultValue = defaultValue.trim()

  return { varName, defaultValue, endIndex: i }
}

/**
 * 从编译后的 CSS 中提取所有 CSS 变量及其值
 * @param css 编译后的 CSS 字符串
 * @param componentName 组件名称，用于过滤只属于该组件的变量
 */
function getCssVarFromCompiledCss(css: string, componentName?: string) {
  const varMap = new Map<string, string>()
  const prefix = componentName ? `--pa-${componentName}` : null

  // 查找所有的 var( 出现位置
  let index = 0
  while (index < css.length) {
    const varIndex = css.indexOf('var(', index)
    if (varIndex === -1) {
      break
    }

    const result = parseVarFunction(css, varIndex)
    if (result) {
      const { varName, defaultValue } = result

      // 如果指定了组件名称，只保留该组件的变量
      const shouldInclude = !prefix || varName.startsWith(prefix)

      // 如果已经有这个变量，跳过（保留第一次出现的）
      if (shouldInclude && !varMap.has(varName)) {
        varMap.set(varName, defaultValue || '-')
      }

      index = result.endIndex + 1
    } else {
      index = varIndex + 4
    }
  }

  // 转换为数组格式
  const data: CssVarItem[] = []
  varMap.forEach((value, name) => {
    data.push({ name, value })
  })

  return data
}

/**
 * 编译 SCSS 文件并提取 CSS 变量
 * @param scssFilePath SCSS 文件路径
 * @param componentName 组件名称，用于过滤变量
 */
function getCssVar(scssFilePath: string, componentName?: string) {
  try {
    // 编译 SCSS 文件
    const result = compileString(readFileSync(scssFilePath, 'utf-8'), {
      loadPaths: [path.dirname(scssFilePath), path.resolve(scssFilePath, '../../styles')],
      style: 'expanded',
    })

    // 从编译后的 CSS 中提取变量
    return getCssVarFromCompiledCss(result.css, componentName)
  } catch (error) {
    console.error(`编译 SCSS 文件失败: ${scssFilePath}`, error)
    return []
  }
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
    const cssVarSet = new Set<string>() // 用于去重

    const dir = await opendir(`${sourceDirPath}/${componentName}`)
    for await (const dirent of dir) {
      if (/.+\.scss$/.test(dirent.name)) {
        const scssFilePath = path.join(sourceDirPath, componentName, dirent.name)
        // 传入组件名称进行过滤
        const vars = getCssVar(scssFilePath, componentName)

        // 去重添加
        vars.forEach((v) => {
          const key = `${v.name}|${v.value}`
          if (!cssVarSet.has(key)) {
            cssVarSet.add(key)
            cssVarList.push(v)
          }
        })
      }
    }

    // 按横杠数量排序，横杠越多越靠后，横杠数量相同则保持原顺序
    cssVarList.sort((a, b) => {
      const countA = (a.name.match(/-/g) || []).length
      const countB = (b.name.match(/-/g) || []).length

      if (countA !== countB) {
        return countA - countB
      }

      // 横杠数量相同，按字母顺序排序
      return a.name.localeCompare(b.name)
    })

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
