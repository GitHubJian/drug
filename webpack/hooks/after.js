const webpackConfig = require('../../config/webpack.conf')
const pack = require('./utils/afterpack')

const hook = async () => {
  let { afterHooks = [] } = webpackConfig
  let hooks =
    afterHooks.filter(v => {
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
