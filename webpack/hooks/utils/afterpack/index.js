const Copy = require('copy')

const _move_ = (from, to) => {
  return new Promise((resolve, reject) => {
    Copy(from, to, (err, files) => {
      if (err) reject(err)
      else resolve(files)
    })
  })
}

async function afterPack () {
  const patterns = []

  try {
    for (const { from, to } of patterns) {
      await _move_(from, to)
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = afterPack
