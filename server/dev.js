const root = process.cwd()
const path = require('path')

const Koa = require('koa')
const KoaLogger = require('koa-logger')
const KoaBody = require('koa-body')
const KoaFavicon = require('koa-favicon')
const printRoute = require('./utils/printRoute')
const { openBrowser } = require('./utils/openBrowser')

const actionsMiddleware = require('./middleware/actionsMiddleware')
const exceptionMiddleware = require('./middleware/exceptionMiddleware')
const proxyMiddleware = require('./middleware/proxyMiddleware')
const routerMiddleware = require('./middleware/routerMiddleware')
const devCSRMiddleware = require('./middleware/devCSRMiddleware')
const mockMiddleware = require('./middleware/mockMiddleware')
const assertMiddleware = require('./middleware/assertMiddleware')

module.exports = function(config) {
  let app = new Koa()
  app.use(KoaLogger())
  app.use(KoaFavicon(path.resolve(root, './favicon.ico')))
  app.use(KoaBody({ patchKoa: true }))

  app.use(exceptionMiddleware(config))
  app.use(proxyMiddleware(config))
  app.use(actionsMiddleware(config))
  app.use(mockMiddleware(config))

  routerMiddleware(config).forEach(v => {
    app.use(v)
  })

  devCSRMiddleware(config, app)

  app.use(assertMiddleware(config))

  app.listen(config.port, function() {
    console.log(`✨ 服务已开启 http://localhost:${config.port}/`)

    printRoute()

    config.openUrlEnable && openBrowser(config.openUrl)
  })
}
