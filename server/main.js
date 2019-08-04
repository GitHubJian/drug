const root = process.cwd()
const path = require('path')

const Koa = require('koa')
const KoaLogger = require('koa-logger')
const KoaBody = require('koa-body')
const KoaFavicon = require('koa-favicon')
const printRoute = require('./utils/printRoute')
const { openBrowser } = require('./utils/openBrowser')

const actionsMiddleware = require('./middleware/actionsMiddleware.js')
const assertMiddleware = require('./middleware/assertMiddleware.js')
const exceptionMiddleware = require('./middleware/exceptionMiddleware.js')
const proxyMiddleware = require('./middleware/proxyMiddleware.js')
const routerMiddleware = require('./middleware/routerMiddleware.js')
const htmlMiddleware = require('./middleware/htmlMiddleware.js')

module.exports = function(config) {
  let app = new Koa()
  app.use(KoaLogger())
  app.use(KoaFavicon(path.resolve(root, './favicon.ico')))
  app.use(KoaBody({ patchKoa: true }))

  app.use(exceptionMiddleware(config))
  app.use(proxyMiddleware(config))
  app.use(actionsMiddleware(config))

  // routerMiddleware(config).forEach(v => {
  //   app.use(v)
  // })

  app.use(assertMiddleware(config))
  app.use(htmlMiddleware(config))

  app.listen(config.port, function() {
    console.log(`✨ 服务已开启 http://localhost:${config.port}/`)

    printRoute()

    config.openUrlEnable && openBrowser(config.openUrl)
  })
}
