
/**
 * 当前适用于 client 的 mock 层
 *
 * 如果 url 为 /api/test or api2/test2
 * 将会查找 config.path 文件夹 下的 api.js or api2.js
 * 然后调用该 js 下的 apiName
 */
const config = require('./config')
const request = require('./request')
const list = require('./list')
// const pathToRegexp = require('path-to-regexp')

const { enable, remotePrefix, routerPrefix } = config

let apis = (list || []).reduce((prev, api) => {
  let obj = Object.entries(api).reduce((apiObj, [apiName, apiCfg]) => {
    let { url, method = 'get', mock = false, thenable = res => res } = apiCfg

    method = method.toLowerCase()

    let fn = function (body) {
      if (enable && mock) {
        // 暂不支持 param 传参
        // let realUrl = remotePrefix + pathToRegexp.compile(url)(body)
        let realUrl = remotePrefix + url

        return request[method]({
          url: realUrl,
          params: body
        }).then(thenable)
      } else {
        return request[method]({
          url: routerPrefix + url,
          params: body
        }).then(thenable)
      }
    }

    apiObj[apiName] = fn

    return apiObj
  }, {})

  Object.assign(prev, obj)

  return prev
}, {})

const install = (Vue, opts = {}) => {
  Vue.prototype.$apis = apis
}

module.exports = {
  install
}
