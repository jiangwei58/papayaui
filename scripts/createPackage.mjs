import fs from 'fs'
import url from 'url'
import path from 'path'

const getPackageJson = () => {
  const filePath = path.resolve(url.fileURLToPath(import.meta.url), '../../package.json')
  const dataStr = fs.readFileSync(filePath).toString()
  const json = JSON.parse(dataStr)
  json.main = 'index.ts'
  for (const key in json.dependencies) {
    if (!['async-validator', 'dayjs', 'cos-wx-sdk-v5'].includes(key)) {
      delete json.dependencies[key]
    }
  }
  delete json.scripts
  delete json.devDependencies
  json.files = ['*']
  return json
}

const writePackage = (packageJSON) => {
  const writeFilePath = path.resolve(
    url.fileURLToPath(import.meta.url),
    '../../src/packages/package.json',
  )
  const steam = fs.createWriteStream(writeFilePath)
  const content = JSON.stringify(packageJSON, undefined, 2)
  steam.write(content)
  steam.end()
  console.log(`created ${writeFilePath}`)
}

const main = () => {
  const packageJSON = getPackageJson()
  writePackage(packageJSON)
}

main()
