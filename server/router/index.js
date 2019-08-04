const glob = require('glob')
const path = require('path')
const routers = glob
  .sync(path.resolve(__dirname, './*.router.js'))
  .reduce((prev, filename) => {
    let file = require(filename)
    if (Array.isArray(file)) {
      prev = prev.concat(file)
    } else {
      prev.push(file)
    }

    return prev
  }, [])

module.exports = routers
