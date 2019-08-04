const pathToRegexp = require('path-to-regexp')

function safeDecodeURIComponent (text) {
  try {
    return decodeURIComponent(text)
  } catch (e) {
    return text
  }
}

function createParams (captures, paramNames, existingParams) {
  let params = existingParams || {}

  for (let len = captures.length, i = 0; i < len; i++) {
    if (paramNames[i]) {
      let c = captures[i]
      params[paramNames[i].name] = c ? safeDecodeURIComponent(c) : c
    }
  }

  return params
}

function checkPathValid (path, routerPattern, ctx) {
  let paramNames = []
  let re = pathToRegexp(routerPattern, paramNames)
  let result = re.exec(path)
  if (!result) {
    return false
  }

  let params = createParams(result.slice(1), paramNames, ctx.params)

  ctx.params = params

  return true
}

module.exports = checkPathValid
