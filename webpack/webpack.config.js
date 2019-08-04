const pathConfig = require('../config/path.conf')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsWebpackPlugin = require('assets-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || 'production'
const [isProduction] = [NODE_ENV === 'production']

const { entry } = require('./utils/entry.js')
const dllEntry = require('./utils/entry-dll.js')
const { htmlAssets, publicPath: dllPublicPath } = require('./utils/asset.js')
const { alias } = require('./utils/alias.js')

const { publicPath } = require('./utils/output.js')

const HtmlWebpackPluginList = Object.entries(entry).map(([k, v]) => {
  // 自动追加 webpack.output.publicPath 为 prefix
  return new HtmlWebpackPlugin({
    filename: path.resolve(pathConfig.static, `${k}.html`),
    template: path.resolve(__dirname, './template/csr.ejs'),
    title: '药品大资讯',
    favicon: pathConfig.favicon,
    chunks: ['global', k],
    NODE_ENV,
    inject: 'body',
    chunksSortMode: 'dependency',
    minify: {
      // removeComments: true, //移除HTML中的注释
      // collapseWhitespace: true, //删除空白符与换行符
      // 为了使GAEA能正确识别script, 保留引号
      // removeAttributeQuotes: true,
      // minifyJS: true,
      // removeScriptTypeAttributes: true,
      // removeStyleLinkTypeAttributes: true
    }
  })
})

const webpackConfig = {
  mode: 'production',
  entry: Object.assign({ global: pathConfig.global }, entry),
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: pathConfig.static,
    publicPath: publicPath
  },
  resolve: {
    alias,
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'vue-style-loader'
            ],
            sass: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
              'vue-style-loader'
            ],
            js: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-syntax-dynamic-import']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.DefinePlugin({
      'process.env.buildTime': JSON.stringify(Date.now())
    }),
    new webpack.ProvidePlugin({
      qs: 'query-string',
      axios: 'axios'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: pathConfig.favicon,
          to: pathConfig.static
        },
        {
          from: `${pathConfig.dist}/css/*.css`,
          to: `${pathConfig.static}/css/[name].[ext]`
        },
        {
          from: `${pathConfig.dist}/js/*.js`,
          to: `${pathConfig.static}/js/[name].[ext]`
        },
        {
          from: `${pathConfig.dist}/images/*.*`,
          to: `${pathConfig.static}/images/[name].[ext]`
        },
        {
          from: `${pathConfig.dll}/css/*.css`,
          to: `${pathConfig.static}/css/[name].[ext]`
        },
        {
          from: `${pathConfig.dll}/js/*.js`,
          to: `${pathConfig.static}/js/[name].[ext]`
        },
        {
          from: `${pathConfig.dll}/images/*.*`,
          to: `${pathConfig.static}/images/[name].[ext]`
        }
      ],
      {
        debug: 'warning'
      }
    )
  ],
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        uglifyES: {
          compress: {
            warnings: false,
            drop_console: isProduction
          }
        },
        exclude: ['vendor.js'],
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g, // 正则表达式，用于匹配需要优化或者压缩的资源名
        cssProcessor: require('cssnano'), // 压缩和优化CSS 的处理器
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true // 在 console 中打印信息
      })
    ]
  },
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false
  }
}

// 动态引入dll
webpackConfig.plugins.push(
  ...Object.keys(dllEntry).reduce((prev, v) => {
    if (fs.existsSync(`${pathConfig.dll}/${v}.json`)) {
      prev.push(
        new webpack.DllReferencePlugin({
          manifest: require(`${pathConfig.dll}/${v}.json`)
        })
      )
    }

    return prev
  }, [])
)

webpackConfig.plugins.push(
  ...[
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: [pathConfig.static]
    }),
    new AssetsWebpackPlugin({
      path: pathConfig.static,
      filename: 'index.json',
      prettyPrint: true,
      processOutput(assets) {
        delete assets['']
        return JSON.stringify(assets, null, 4)
      }
    }),
    ...HtmlWebpackPluginList
  ]
)

if (fs.existsSync(`${pathConfig.dll}/index.json`)) {
  webpackConfig.plugins.push(
    new HtmlWebpackIncludeAssetsPlugin({
      append: false,
      assets: htmlAssets.map(v => {
        return v.substring(dllPublicPath.length - 1)
      })
    })
  )
}

webpackConfig.plugins.push(
  new TerserPlugin({
    parallel: true,
    terserOptions: {
      ecma: 6
    }
  })
)

module.exports = { webpackConfig }
