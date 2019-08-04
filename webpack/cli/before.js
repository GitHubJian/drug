const before = require('../hooks/before')

;(async () => {
  try {
    await before()
  } catch (ex) {
    console.log(ex)
  }
})()
