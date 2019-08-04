const root = process.cwd()
const path = require('path')
const fse = require('fs-extra')
const KoaSend = require('koa-send')
const pathToRegexp = require('path-to-regexp')
const { extend } = require('../utils/extend.js')

const defaultOptions = {
  homePage: 'index',
  htmlURLPrefix: '/html',
  htmlStaticDir: path.resolve(root, './static'),
  htmlPathValid: function(path, htmlURLPrefix = '/html') {
    let re = pathToRegexp(`${htmlURLPrefix}/(.+)`)

    return re.exec(path)
  },
  htmlRealPath: function(path, htmlURLPrefix = '/html') {
    return path.substring(htmlURLPrefix.length)
  }
}

const maxage = 365 * 24 * 60 * 60 * 1000 // one year

const install = function(options, app) {
  let {
    homePage,
    htmlPathValid,
    htmlStaticDir,
    htmlRealPath,
    htmlURLPrefix
  } = extend(defaultOptions, options)

  homePage = htmlURLPrefix + homePage

  return async (ctx, next) => {
    let reqPath = ctx.path
    if (!(ctx.path === '/' || htmlPathValid(reqPath, htmlURLPrefix))) {
      await next()
      return
    }

    if (ctx.path === '/') {
      reqPath = homePage
    }

    let realReqPath = htmlRealPath(reqPath, htmlURLPrefix) + '.html'

    let filePath = path.resolve(htmlStaticDir, `.${realReqPath}`)
    const exists = await fse.pathExists(filePath)

    let result
    if (exists) {
      result = await KoaSend(ctx, realReqPath, {
        root: htmlStaticDir,
        maxage,
        setHeaders: (res, path, stats) => {
          res.setHeader('Author', 'xiaows')
          if (path.endsWith('.json')) {
            res.setHeader('Access-Control-Allow-Origin', '*')
          }
          res.setHeader(
            'Cache-Control',
            `max-age=${
              path.endsWith('.html') ? 0 : 3.1536 * 1e10
            },must-revalidate`
          )
          res.setHeader('Cache-Control', `max-age=0,must-revalidate`)
        }
      })
    }

    if (!result) {
      ctx.status = 404
      ctx.body = `404 | Page Not Found | ${ctx.path}`
    }
  }
}

module.exports = install
