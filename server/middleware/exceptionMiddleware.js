const { logger } = require('../utils/logger')
const path = require('path')
const fse = require('fs-extra')
const defaultConfig = {
  errorHtmlPath: path.resolve(__dirname, '../template/error.html')
}

const defaultHtmlContent = fse.readFileSync(
  defaultConfig.errorHtmlPath,
  'utf-8'
)

const install = function exceptionInstall(options, app) {
  let createErrorHtmlContent =
    options.createErrorHtmlContent ||
    function(url) {
      return defaultHtmlContent
    }

  return async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      console.error(e)

      logger.error(e, [ctx.request.url])

      // if (ctx.status === 404) {
      //   ctx.status = 500
      // }

      ctx.status = 200

      let msg = (e && e.toString()) || '服务器错误'
      if (
        ctx.accept.headers.accept &&
        ~ctx.accept.headers.accept.indexOf('json')
      ) {
        ctx.body = { code: -1, msg: msg, data: null }
      } else {
        ctx.body = createErrorHtmlContent(ctx.url) || defaultHtmlContent
      }
    }
  }
}

module.exports = install
