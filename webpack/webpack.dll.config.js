const pathConfig = require('../config/path.conf')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsWebpackPlugin = require('assets-webpack-plugin')
const LIBRARY_NAME = '__[name]_[chunkhash]__'
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { NODE_ENV } = process.env
// const isProduction = NODE_ENV === 'production'

const entry = require('./utils/entry-dll.js')

const { publicPath } = require('./utils/output.js')

const webpackConfig = {
  mode: 'production',
  entry,
  output: {
    filename: `js/[name].[chunkhash].js`,
    path: pathConfig.dll,
    publicPath: publicPath,
    library: LIBRARY_NAME
  },
  resolve: {
    extensions: ['.js', '.css'],
    modules: [pathConfig.nodeModule]
  },
  resolveLoader: {
    modules: [pathConfig.nodeModule]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: [pathConfig.dll]
    }),
    new webpack.DllPlugin({
      path: path.resolve(pathConfig.dll, '[name].json'),
      name: LIBRARY_NAME
    }),
    new AssetsWebpackPlugin({
      path: pathConfig.dll,
      filename: 'index.json',
      prettyPrint: true
    })
  ],
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false
  }
}

module.exports = { webpackConfig }
