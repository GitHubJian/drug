const pathConfig = require('./path.conf')

module.exports = {
  beforeHooks: [],
  afterHooks: [],
  alias: {
    '@zoo': pathConfig.zoo
  }
}
