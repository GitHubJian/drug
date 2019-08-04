const glob = require('glob')
const path = require('path')
const pathConfig = require('../../config/path.conf')
const { INDEX_FILE_NAME, ENTRY_FILE_NAME } = require('../file.config')

let entry = glob
  .sync(path.resolve(pathConfig.pages, `./**/${INDEX_FILE_NAME}`))
  .reduce((prev, cur) => {
    let entryKey = cur.substring(
      pathConfig.pages.length + 1,
      cur.length - INDEX_FILE_NAME.length - 1
    )
    let entryValue = path.resolve(
      pathConfig.prepackPath,
      `${entryKey}/${ENTRY_FILE_NAME}`
    )

    prev[entryKey] = entryValue
    return prev
  }, {})

module.exports = { entry }
