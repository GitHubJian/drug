const { before } = require('../index')
;(async () => {
  try {
    await before()
  } catch (ex) {
    console.log(ex)
  }
})()
