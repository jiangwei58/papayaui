import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

// 源目录和目标目录
const SOURCE_DIR = path.resolve(ROOT_DIR, 'packages/papayaui')
const DIST_DIR = path.resolve(ROOT_DIR, 'dist')

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
 * 步骤1: 复制 packages/papayaui 到 dist 目录
 */
const copyPackageToDistDir = (): void => {
  console.log('📦 Step 1: Copying packages/papayaui to dist...')

  // 清空 dist 目录
  cleanDir(DIST_DIR)

  // 复制目录
  copyDir(SOURCE_DIR, DIST_DIR)

  console.log(`✓ Copied to ${DIST_DIR}`)
}

/**
 * 步骤2: 生成发布用的 package.json
 */
const createPackageJson = (): void => {
  console.log('📝 Step 2: Creating release package.json...')

  const packageJsonPath = path.resolve(DIST_DIR, 'package.json')
  const dataStr = fs.readFileSync(packageJsonPath).toString()
  const packageData = JSON.parse(dataStr)

  // 设置 main 字段
  packageData.main = 'index.ts'

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
 * 步骤3: 生成 global.d.ts 类型文件
 */
const createGlobalType = (): void => {
  console.log('📄 Step 3: Creating global.d.ts...')

  const typingsFilePath = path.resolve(ROOT_DIR, 'typings/components.d.ts')
  let dataStr = fs.readFileSync(typingsFilePath).toString()

  // 将相对路径替换为以 papayaui 开头的绝对路径
  dataStr = dataStr.replace(/\.\.\/packages\/papayaui\/components\//g, 'papayaui/components/')

  const globalDtsPath = path.resolve(DIST_DIR, 'global.d.ts')
  fs.writeFileSync(globalDtsPath, dataStr)

  console.log(`✓ Global types created: ${globalDtsPath}`)
}

/**
 * 步骤4: 复制 README.md
 */
const copyReadme = (): void => {
  console.log('📖 Step 4: Copying README.md...')

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

    // 步骤2: 生成发布用的 package.json
    createPackageJson()
    console.log()

    // 步骤3: 生成 global.d.ts
    createGlobalType()
    console.log()

    // 步骤4: 复制 README.md
    copyReadme()
    console.log()

    console.log('✅ Build completed successfully!')
  } catch (error) {
    console.error('❌ Build failed:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

main()
