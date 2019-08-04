module.exports = {
  proxy: {
    '/item/(.*)': {
      url: 'http://192.168.0.108:8888',
      map: function(path) {
        return path
      }
    }
  }
}
