const fs = require('fs')
const path = require('path')
const root = process.cwd()

// 接口mock请求, 读取mock文件下对应方法返回

module.exports = function(config) {
  return async (ctx, next) => {
    // 不以mock开头的, 跳到下一中间件
    if (!ctx.path.startsWith('/mock')) {
      return await next()
    }

    let pathArr = ctx.path.split('/')
    let methodName = pathArr.pop()
    let restPath = pathArr.join('/')

    // mock文件所对应的位置
    let filePath = path.join(root, `${restPath}.js`)

    if (!fs.existsSync(filePath)) {
      // 文件不存在
      return (ctx.status = 404)
    }

    delete require.cache[filePath]
    let methods = require(filePath)
    let api

    if ((api = methods[methodName])) {
      ctx.body = {
        code: 0,
        msg: '',
        data: api({ query: ctx.query, body: ctx.request.body })
      }
    } else {
      // 方法不存在
      return (ctx.status = 404)
    }
  }
}
