exports.list = function() {
  var body = []
  let o = {
    name: '索菲亚索菲亚索菲亚索菲亚',
    price: 10,
    imgList: ['1.png', '1.png', '1.png']
  }

  for (let i = 0; i < 8; i++) {
    body.push({
      name: o.name + i,
      price: o.price + i,
      imgList: o.imgList
    })
  }

  return body
}

exports.type = function() {
  return [
    {
      id: 1,
      text: '药品1'
    },
    {
      id: 2,
      text: '药品2'
    },
    {
      id: 3,
      text: '3'
    }
  ]
}

exports.listByType = function() {
  var body = []
  let o = {
    name: '索菲亚索菲亚索菲亚索菲亚',
    price: 10,
    imgList: ['1.png', '1.png', '1.png']
  }

  for (let i = 0; i < 8; i++) {
    body.push({
      name: o.name + i,
      price: o.price + i,
      imgList: o.imgList
    })
  }

  return body
}
