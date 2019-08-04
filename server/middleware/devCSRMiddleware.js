const root = process.cwd()
const fse = require('fs-extra')
const path = require('path')
const KoaSend = require('koa-send')
const pathConfig = require('../../config/path.conf.js')
const webpack = require('webpack')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pathToRegexp = require('path-to-regexp')

const { hotMiddleware } = require('koa-webpack-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const { webpackConfig } = require(path.resolve(
  root,
  'webpack/webpack.dev.config.js'
))
const templatePath = path.resolve(__dirname,'../template/html.ejs')
const { NODE_ENV } = process.env
const deepClone = v => JSON.parse(JSON.stringify(v))
const projectEntry = deepClone(webpackConfig.entry)

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const { htmlAssets, publicPath: dllPublicPath } = require(path.resolve(
  root,
  'webpack/utils/asset.js'
))

webpackConfig.entry = {
  global: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true',
    pathConfig.global
  ]
}

const { extend } = require('../utils/extend.js')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(webpackConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

const defaultConfig = {
  homePage: '/index',
  assertRouter: webpackConfig.output.publicPath,
  dir: pathConfig.dll,
  htmlURLPrefix: '/html'
}

const defaultOptions = {
  pathCheckValid: function(path, htmlURLPrefix) {
    let re = pathToRegexp(`${htmlURLPrefix}/(.+)`)

    return re.exec(path)
  },
  pathToEntry: function(path, htmlURLPrefix) {
    return path.substring(htmlURLPrefix.length + 1)
  }
}

const lifeCycleHook = (options, app) => {
  let htmlURLPrefix = options.htmlURLPrefix || defaultConfig.htmlURLPrefix
  let htmlTitle = options.title || '药品大资讯'
  let homePage = htmlURLPrefix + (options.homePage || defaultConfig.homePage)
  let { dir, assertRouter } = defaultConfig
  let { pathCheckValid, pathToEntry } = extend(
    defaultOptions,
    options.devServer
  )

  const compiler = webpack(webpackConfig)
  const devMiddlewareInstance = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: webpackConfig.stats
  })

  let devMiddlewarePromise = function(entryKey) {
    return new Promise((resolve, reject) => {
      devMiddlewareInstance.waitUntilValid(function(stats) {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) {
          reject(stats)
        } else {
          let html = readFile(
            devMiddlewareInstance.fileSystem,
            `${entryKey}.html`
          )
          resolve(html)
        }
      })
    })
  }

  app.use(async (ctx, next) => {
    let reqPath = ctx.path
    if (ctx.path === '/' || pathCheckValid(reqPath, htmlURLPrefix)) {
      // 首页
      if (ctx.path === '/') {
        reqPath = homePage
      }

      const entryKey = pathToEntry(reqPath, htmlURLPrefix)

      if (projectEntry[entryKey]) {
        const entryValue = projectEntry[entryKey]

        compiler.apply(new SingleEntryPlugin(root, entryValue, entryKey))
        compiler.apply(
          new HtmlWebpackPlugin({
            filename: path.resolve(pathConfig.static, `${entryKey}.html`),
            title: htmlTitle,
            template: templatePath,
            favicon: pathConfig.favicon,
            chunks: ['global', entryKey],
            NODE_ENV
          })
        )

        const assets = htmlAssets.map(v => {
          return v.substring(dllPublicPath.length - 1)
        })

        compiler.apply(
          new HtmlWebpackIncludeAssetsPlugin({
            append: false,
            assets: assets
          })
        )

        devMiddlewareInstance.invalidate()

        let html = await devMiddlewarePromise(entryKey)
        ctx.body = html
      }
    } else {
      await next()
    }
  })

  app.use(async (ctx, next) => {
    ctx.status = 200
    await devMiddlewareInstance(ctx.req, ctx.res, async () => {
      await next()
    })
  })

  app.use(async (ctx, next) => {
    // 静态资源
    let reqPath = ctx.path
    if (reqPath === '/__webpack_hmr') {
      await next()
    } else {
      let maxage = 365 * 24 * 60 * 60 * 1000

      let filePathOpposite = reqPath.substring(assertRouter.length)
      let filePath = path.resolve(dir, `.${filePathOpposite}`)

      const exists = await fse.pathExists(filePath)
      let result
      if (exists) {
        result = await KoaSend(ctx, filePathOpposite, {
          root: dir,
          maxage
        })
      }

      if (!result) {
        await next()
      }
    }
  })

  app.use(hotMiddleware(compiler))
}

module.exports = lifeCycleHook
