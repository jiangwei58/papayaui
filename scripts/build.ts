import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

// 源目录和目标目录
const SOURCE_DIR = path.resolve(ROOT_DIR, 'packages/papayaui')
const CORE_SOURCE_DIR = path.resolve(ROOT_DIR, 'packages/core')
const TYPES_SOURCE_DIR = path.resolve(ROOT_DIR, 'packages/types')
const UTILS_SOURCE_DIR = path.resolve(ROOT_DIR, 'packages/utils')
const DIST_DIR = path.resolve(ROOT_DIR, 'dist')
const CORE_DIST_DIR = path.resolve(DIST_DIR, 'core')
const TYPES_DIST_DIR = path.resolve(DIST_DIR, 'types')
const UTILS_DIST_DIR = path.resolve(DIST_DIR, 'utils')

// 复制时需要排除的目录
const IGNORE_DIRS = ['node_modules']

/**
 * 递归复制目录
 */
const copyDir = (src: string, dest: string): void => {
  // 创建目标目录
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    // 跳过需要排除的目录
    if (IGNORE_DIRS.includes(entry.name)) {
      continue
    }

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

/**
 * 清空目录
 */
const cleanDir = (dir: string): void => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true })
  }
}

/**
 * 步骤1: 复制 packages 到 dist 目录
 */
const copyPackageToDistDir = (): void => {
  console.log('📦 Step 1: Copying packages to dist...')

  // 清空 dist 目录
  cleanDir(DIST_DIR)

  // 复制 papayaui 目录
  copyDir(SOURCE_DIR, DIST_DIR)
  console.log(`✓ Copied papayaui to ${DIST_DIR}`)

  // 复制 core 目录
  copyDir(CORE_SOURCE_DIR, CORE_DIST_DIR)
  console.log(`✓ Copied core to ${CORE_DIST_DIR}`)

  // 复制 types 目录
  copyDir(TYPES_SOURCE_DIR, TYPES_DIST_DIR)
  console.log(`✓ Copied types to ${TYPES_DIST_DIR}`)

  // 复制 utils 目录
  copyDir(UTILS_SOURCE_DIR, UTILS_DIST_DIR)
  console.log(`✓ Copied utils to ${UTILS_DIST_DIR}`)
}

/**
 * 步骤2: 替换 @papayaui/xxx 为相对路径
 */
const replacePackageImports = (): void => {
  console.log('🔄 Step 2: Replacing @papayaui imports to relative paths...')

  const packageAliases = ['@papayaui/core', '@papayaui/types', '@papayaui/utils']

  const processFile = (filePath: string, depth: number): void => {
    const content = fs.readFileSync(filePath, 'utf-8')
    let newContent = content

    // 根据文件深度计算相对路径前缀
    // depth 0: dist/index.ts -> './core'
    // depth 1: dist/components/xxx.vue -> '../core'
    // depth 2: dist/components/xxx/xxx.vue -> '../../core'
    const prefix = depth === 0 ? './' : '../'.repeat(depth)

    for (const alias of packageAliases) {
      const packageName = alias.replace('@papayaui/', '')
      // 替换 from '@papayaui/xxx' 为 from './xxx' 或 from '../xxx'
      const regex = new RegExp(`from ['"]${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g')
      newContent = newContent.replace(regex, `from '${prefix}${packageName}'`)
    }

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent)
    }
  }

  const processDir = (dir: string, depth: number): void => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // 跳过子包目录（core, types, utils），它们内部的文件不需要处理
        if (['core', 'types', 'utils'].includes(entry.name) && depth === 0) {
          continue
        }
        processDir(fullPath, depth + 1)
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.vue')) {
        processFile(fullPath, depth)
      }
    }
  }

  processDir(DIST_DIR, 0)
  console.log('✓ Package imports replaced')
}

/**
 * 步骤3: 生成发布用的 package.json
 */
const createPackageJson = (): void => {
  console.log('📝 Step 3: Creating release package.json...')

  // 删除子包目录下的 package.json（作为内嵌目录，不需要独立的 package.json）
  const subPackageDirs = [CORE_DIST_DIR, TYPES_DIST_DIR, UTILS_DIST_DIR]
  for (const dir of subPackageDirs) {
    const pkgJsonPath = path.resolve(dir, 'package.json')
    if (fs.existsSync(pkgJsonPath)) {
      fs.unlinkSync(pkgJsonPath)
    }
  }

  // 处理 papayaui 的 package.json
  const packageJsonPath = path.resolve(DIST_DIR, 'package.json')
  const dataStr = fs.readFileSync(packageJsonPath).toString()
  const packageData = JSON.parse(dataStr)

  // 设置 main 字段
  packageData.main = 'index.ts'

  // 添加 exports 字段（所有内容都从主入口导出，也支持子路径导入）
  packageData.exports = {
    '.': {
      import: './index.ts',
      require: './index.ts',
    },
    './core': {
      import: './core/index.ts',
      require: './core/index.ts',
    },
    './types': {
      import: './types/index.ts',
      require: './types/index.ts',
    },
    './utils': {
      import: './utils/index.ts',
      require: './utils/index.ts',
    },
    './*': './*',
  }

  // 只保留特定的依赖
  const allowedDependencies = ['async-validator', 'dayjs', 'cos-wx-sdk-v5']
  for (const key in packageData.dependencies) {
    if (!allowedDependencies.includes(key)) {
      delete packageData.dependencies[key]
    }
  }

  // 删除不需要的字段
  delete packageData.scripts
  delete packageData.devDependencies

  // 添加 files 字段
  packageData.files = ['*']

  // 写入文件
  const content = JSON.stringify(packageData, null, 2) + '\n'
  fs.writeFileSync(packageJsonPath, content)

  console.log(`✓ Package.json created: ${packageJsonPath}`)
}

/**
 * 步骤4: 生成 global.d.ts 类型文件
 */
const createGlobalType = (): void => {
  console.log('📄 Step 4: Creating global.d.ts...')

  const typingsFilePath = path.resolve(ROOT_DIR, 'typings/components.d.ts')
  let dataStr = fs.readFileSync(typingsFilePath).toString()

  // 将相对路径替换为以 papayaui 开头的绝对路径
  dataStr = dataStr.replace(/\.\.\/packages\/papayaui\/components\//g, 'papayaui/components/')

  const globalDtsPath = path.resolve(DIST_DIR, 'global.d.ts')
  fs.writeFileSync(globalDtsPath, dataStr)

  console.log(`✓ Global types created: ${globalDtsPath}`)
}

/**
 * 步骤5: 复制 README.md
 */
const copyReadme = (): void => {
  console.log('📖 Step 5: Copying README.md...')

  const srcReadme = path.resolve(ROOT_DIR, 'README.md')
  const destReadme = path.resolve(DIST_DIR, 'README.md')

  if (fs.existsSync(srcReadme)) {
    fs.copyFileSync(srcReadme, destReadme)
    console.log(`✓ README.md copied to ${destReadme}`)
  } else {
    console.log('⚠ README.md not found, skipping...')
  }
}

/**
 * 主函数
 */
const main = () => {
  console.log('🚀 Starting build process...\n')

  try {
    // 步骤1: 复制目录
    copyPackageToDistDir()
    console.log()

    // 步骤2: 替换包导入路径
    replacePackageImports()
    console.log()

    // 步骤3: 生成发布用的 package.json
    createPackageJson()
    console.log()

    // 步骤4: 生成 global.d.ts
    createGlobalType()
    console.log()

    // 步骤5: 复制 README.md
    copyReadme()
    console.log()

    console.log('✅ Build completed successfully!')
  } catch (error) {
    console.error('❌ Build failed:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

main()
