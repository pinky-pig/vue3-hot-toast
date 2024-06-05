import path, { dirname } from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'

const ENV = { ...loadEnv('development', process.cwd()) }

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sourcePath1 = path.resolve(__dirname, '../packages/package.json') // 修改为实际的第一个源文件路径
const destinationPath1 = path.resolve(__dirname, '../output-lib/package.json') // 修改为实际的第一个目标文件路径

const sourcePath2 = path.resolve(__dirname, '../README.md') // 修改为实际的第二个源文件路径
const destinationPath2 = path.resolve(__dirname, '../output-lib/README.md') // 修改为实际的第二个目标文件路径

function copy(sourcePath: string, targetPath: string) {
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file ${sourcePath} does not exist.`)
    process.exit(1)
  }

  // 读取源文件内容
  fs.readFile(sourcePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading source file: ${err}`)
      process.exit(1)
    }

    // 如果是 package.json 文件，则添加一些字段
    if (sourcePath.endsWith('package.json')) {
      const packageJson = JSON.parse(data)
      packageJson.main = './pkg_name.es.js'
      packageJson.module = './pkg_name.es.js'
      packageJson.types = './playground.d.ts'
      packageJson.exports = {
        '.': {
          types: './playground.d.ts',
          require: './pkg_name.umd.cjs',
          import: './pkg_name.es.js',
        },
      }
      data = JSON.stringify(packageJson, null, 2)
    }

    // 替换包名和仓库地址
    data = data.replaceAll('pkg_name', ENV.VITE_PKG_NAME)
    data = data.replaceAll('pkg_homepage', ENV.VITE_PKG_HOMEPAGE)
    data = data.replaceAll('pkg_repository_url', ENV.VITE_PKG_REPOSITORY_URL)

    // 写入目标文件
    fs.writeFile(targetPath, data, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing destination file: ${err}`)
        process.exit(1)
      }
    })
  })
}

copy(sourcePath1, destinationPath1)

copy(sourcePath2, destinationPath2)
