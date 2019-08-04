const root = process.cwd()
const path = require('path')
const pathConfig = require(path.resolve(root, './config/path.conf.js'))

const glob = require('glob')
const fse = require('fs-extra')
const fs = require('fs')
const Mustache = require('mustache')
const template = fs.readFileSync(path.resolve(__dirname, './template.js'), {
  encoding: 'utf-8'
})
const writer = (p, c) => fse.outputFileSync(p, c, { encoding: 'utf-8' })

const { INDEX_FILE_NAME, ENTRY_FILE_NAME } = require('../../../file.config')

function createRelativePath(from, to) {
  return path.relative(from, to)
}

const createContent = (entryPath, key) => {
  let folderPath = path.resolve(pathConfig.pages, `${key}`)
  let storeEnable =
    fs.existsSync(folderPath + '/store/index.js') ||
    fs.existsSync(folderPath + '/store.js') ||
    false

  return Mustache.render(template, {
    entryPath: createRelativePath(entryPath, folderPath),
    entryFileName: INDEX_FILE_NAME,
    storeEnable
  })
}

const prepack = async () => {
  // rm -rf *
  fse.emptyDirSync(pathConfig.prepackPath)

  return glob
    .sync(path.resolve(pathConfig.pages, `./**/${INDEX_FILE_NAME}`))
    .forEach(async entry => {
      let key = entry.substring(
        pathConfig.pages.length + 1,
        entry.length - INDEX_FILE_NAME.length - 1
      )

      let outputFilePath = path.resolve(pathConfig.prepackPath, `${key}`)
      writer(
        outputFilePath + `/${ENTRY_FILE_NAME}`,
        createContent(outputFilePath, key)
      )
    })
}

module.exports = prepack
