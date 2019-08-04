const after = require('../hooks/after')

;(async () => {
  try {
    await after()
  } catch (ex) {
    console.log(ex)
  }
})()
