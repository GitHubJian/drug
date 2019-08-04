const url = require('url')
const KoaProxy = require('koa-proxy')
const KoaConvert = require('koa-convert')
const pathToRegExp = require('path-to-regexp')
const { logger } = require('../utils/logger')

function defaultMapFunc(path) {
  return path
}

function logProxyRule(host, path, map) {
  let targetUrl = map(path)
  targetUrl = url.resolve(host, targetUrl)
  logger.proxy(`${path} => ${targetUrl}`)
}

const install = function proxyInstall(options, app) {
  let { proxy } = options || {}
  let paths = proxy && Object.keys(proxy)
  let pathRegExp = paths.map(v => pathToRegExp(v))

  // Match from proxy
  return async (ctx, next) => {
    if (!pathRegExp.length) {
      await next()
      return
    }
    let reqPath = ctx.path
    // if (!matchRoute(reqPath, router)) {
    //   await next()
    //   return
    // }

    let map = defaultMapFunc
    let index = pathRegExp.findIndex(re => {
      return re.exec(reqPath)
    })

    if (index < 0) {
      // throw new Error(`Proxy Not found: ${reqPath}`)
      await next()
      return
    }

    let c = paths[index]
    let host = proxy[c].url
    if (typeof proxy[c].map === 'function') {
      map = proxy[c].map
    }

    // 打印转发
    logProxyRule(host, reqPath, map)
    // 将 proxy 返回的 generator 转化为 async
    let fn = KoaConvert(
      KoaProxy({
        host,
        map
      })
    )

    await fn(ctx, next)
  }
}

module.exports = install
