const root = process.cwd()
const KoaSend = require('koa-send')
const path = require('path')
const fse = require('fs-extra')
const { extend } = require('../utils/extend')

const defaultOptions = {
  assertStaticDir: path.resolve(root, './static'),
  assertURLPrefix: '/static',
  assertPathValid: function(path, assertURLPrefix) {
    let re = pathToRegexp(`${assertURLPrefix}/(.+)`)

    return re.exec(path)
  }
}

const install = function assertInstall(options, app) {
  let { assertStaticDir, assertURLPrefix, assertPathValid } = extend(
    defaultOptions,
    options || {}
  )

  return async (ctx, next) => {
    let reqPath = ctx.path
    if (!assertPathValid(reqPath, assertURLPrefix)) {
      await next()
      return
    }

    let maxage = 365 * 24 * 60 * 60 * 1000 // one year
    let realReqPath = reqPath.substring(assertURLPrefix.length)
    let filePath = path.resolve(assertStaticDir, `.${realReqPath}`)
    const exists = await fse.pathExists(filePath)

    let result
    if (exists) {
      result = await KoaSend(ctx, realReqPath, {
        root: assertStaticDir,
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
