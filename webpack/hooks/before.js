const webpackConfig = require('../../config/webpack.conf')
const pack = require('./utils/prepack')

const hook = async () => {
  let { beforeHooks = [] } = webpackConfig
  let hooks =
    beforeHooks.filter(v => {
      return typeof v === 'function'
    }) || []

  for (const index in hooks) {
    if (hooks.hasOwnProperty(index)) {
      const fn = hooks[index]

      await fn.call()
    }
  }

  pack()
}

module.exports = hook
