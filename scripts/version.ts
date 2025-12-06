import fs from 'fs'
import url from 'url'
import path from 'path'

type VersionType = 'major' | 'minor' | 'patch'

// package.json 文件路径
const PACKAGE_JSON_PATH = path.resolve(
  url.fileURLToPath(import.meta.url),
  '../../packages/papayaui/package.json',
)

/**
 * 解析版本号字符串
 */
const parseVersion = (version: string): [number, number, number] => {
  const parts = version.split('.').map(Number)
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Invalid version format: ${version}`)
  }
  return parts as [number, number, number]
}

/**
 * 升级版本号
 */
const bumpVersion = (version: string, type: VersionType): string => {
  const [major, minor, patch] = parseVersion(version)

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    default:
      throw new Error(`Unknown version type: ${type}`)
  }
}

/**
 * 读取 package.json
 */
const readPackageJson = (): { data: Record<string, any>; filePath: string } => {
  const dataStr = fs.readFileSync(PACKAGE_JSON_PATH).toString()
  const data = JSON.parse(dataStr)
  return { data, filePath: PACKAGE_JSON_PATH }
}

/**
 * 写入 package.json
 */
const writePackageJson = (filePath: string, data: Record<string, any>): void => {
  const content = JSON.stringify(data, null, 2) + '\n'
  fs.writeFileSync(filePath, content)
}

/**
 * 生成发布用的 package.json（移植自 createPackage.ts）
 */
const createPackageJson = (sourceData: Record<string, any>): void => {
  const packageData = { ...sourceData }

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

  // 确保目录存在
  const dirPath = path.dirname(PACKAGE_JSON_PATH)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  writePackageJson(PACKAGE_JSON_PATH, packageData)
  console.log(`✓ Package created: ${PACKAGE_JSON_PATH}`)
}

/**
 * 主函数
 */
const main = () => {
  const args = process.argv.slice(2)
  const versionType = args[0] as VersionType

  if (!versionType || !['major', 'minor', 'patch'].includes(versionType)) {
    console.error('Usage: npm run version <major|minor|patch>')
    console.error('Examples:')
    console.error('  npm run version patch  # 0.2.21 -> 0.2.22')
    console.error('  npm run version minor  # 0.2.21 -> 0.3.0')
    console.error('  npm run version major  # 0.2.21 -> 1.0.0')
    process.exit(1)
  }

  try {
    const { data, filePath } = readPackageJson()
    const oldVersion = data.version

    if (!oldVersion) {
      throw new Error('No version field found in package.json')
    }

    const newVersion = bumpVersion(oldVersion, versionType)
    data.version = newVersion

    // 更新版本号
    writePackageJson(filePath, data)
    console.log(`✓ Version updated: ${oldVersion} -> ${newVersion}`)
    console.log(`✓ Updated file: ${filePath}`)

    // 生成发布用的 package.json
    createPackageJson(data)
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

main()
