module.exports = {
  htmlCNDAssert: function(path) {
    return {}
  },
  proxy: {
    '/item/(.*)': {
      url: 'http://47.97.190.0:8888',
      map: function(path) {
        return path
      }
    }
  }
}
