let root = process.cwd()
const { port } = require(`${root}/config/server`)
const pathCfg = require(`${root}/config/path.conf`)
const chalk = require('chalk')
const path = require('path')
const glob = require('glob')
const { INDEX_FILE_NAME } = require('../file.config')
const IP = require('ip')
const HOST = IP.address()

const log = (str, color) => {
  if (!str) console.log('')
  else console.log(color ? chalk[color](str) : str)
}

const printRoute = () => {
  log('路由列表', 'cyan')
  log('-'.repeat(30), 'cyan')
  log()

  glob
    .sync(path.resolve(pathCfg.pages, `./**/${INDEX_FILE_NAME}`))
    .map(v => {
      let path = v.substring(
        pathCfg.pages.length,
        v.length - INDEX_FILE_NAME.length - 1
      )

      return `http://${HOST}${port ? ':' + port : ''}/pages${path}`
    })
    .forEach(p => log(p))

  log()
  log('-'.repeat(30), 'cyan')
}

module.exports = printRoute
