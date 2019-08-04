;(function(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'object') {
    exports['query'] = factory()
  } else {
    global['query'] = factory()
  }
})(this, function() {
  const qs = require('query-string')

  return {
    get: function(key) {
      let ob = qs.parseUrl(window.location.href)

      return ob['query'][key]
    },
    go: function(url) {
      if (!url) return
      let { origin } = window.location

      window.location.href = `${origin}${url}`
    }
  }
})
