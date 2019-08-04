const root = process.cwd()
const path = require('path')
const Copy = require('copy')

const assetPath = path.resolve(root, './asset')
const staticPath = path.resolve(root, './static')

const _move_ = (from, to) => {
  return new Promise((resolve, reject) => {
    Copy(from, to, (err, files) => {
      if (err) reject(err)
      else resolve(files)
    })
  })
}

async function move() {
  let patterns = [
    {
      from: `${assetPath}/images/**`,
      to: staticPath + '/images'
    }
  ]

  for (const { from, to } of patterns) {
    await _move_(from, to)
  }
}

;(async () => {
  try {
    await move()
  } catch (e) {
    console.log(e)
  }
})()
