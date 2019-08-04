const root = process.cwd()
const path = require('path')
const pathConf = require('../path.conf')
const pathToRegexp = require('path-to-regexp')
const Ip = require('ip')
const HOST = Ip.address()
const { NODE_ENV } = process.env
const [isDevelopment] = [NODE_ENV === 'development']

let { PORT } = process.env
PORT = PORT || 8520

const homeUrl = `http://${HOST}:${PORT}/pages/index`

module.exports = {
  openUrl: homeUrl,
  openUrlEnable: isDevelopment,
  port: PORT,
  errorHtmlPath: path.resolve(pathConf.static, './error.html'),

  homePage: homeUrl,
  devServer: {
    pathCheckValid: function(path, pathPrefix) {
      let re = pathToRegexp(`${pathPrefix}/(.+)`)

      return re.exec(path)
    },
    pathToEntry: function(path, pathPrefix) {
      return path.substring(pathPrefix.length + 1)
    }
  },

  htmlURLPrefix: `/pages`,
  htmlStaticDir: path.resolve(root, './static'),
  htmlPathValid: function(path, htmlURLPrefix) {
    let re = pathToRegexp(`${htmlURLPrefix}/(.+)`)

    return re.exec(path)
  },
  htmlRealPath: function(path, htmlURLPrefix) {
    return path.substring(htmlURLPrefix.length)
  },
  htmlToEntry: function(path, htmlURLPrefix) {
    return path.substring(htmlURLPrefix.length + 1)
  },
  htmlCNDAssert: function(path) {
    return {}
  },

  assertPathValid: function(path, assertURLPrefix) {
    let re = pathToRegexp(`${assertURLPrefix}/(.+)`)

    return re.exec(path)
  },

  routerFolderPath: path.resolve(root, './server/router'),

  proxy: {}
}
