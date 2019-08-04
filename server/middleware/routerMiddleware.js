const path = require('path')
const { extend } = require('../utils/extend.js')
const KoaRouter = require('koa-router')
const koaRouter = new KoaRouter()

let defaultConfig = {
  routerPrefix: '/',
  routerFolderPath: path.resolve(__dirname, '../../router')
}

const func = async function(ctx, next) {
  await next()
}

const install = function routerInstall(options, app) {
  let { routerFolderPath, routerPrefix } = extend(defaultConfig, options || {})

  const prefix = routerPrefix == '' ? '/' : routerPrefix

  const routes = require(routerFolderPath)

  routes.forEach(({ path, method = 'get', fn = func }) => {
    let p
    if (routerPrefix.endsWith('/') && path.startsWith('/')) {
      p = routerPrefix + path.substring(1)
    } else {
      p = routerPrefix + path
    }

    koaRouter[method](p, fn)
  })

  return [koaRouter.routes(), koaRouter.allowedMethods({ throw: true })]
}

module.exports = install
