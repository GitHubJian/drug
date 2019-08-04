module.exports = [
  {
    path: '/apis/drug/list',
    method: 'get',
    fn: async ctx => {
      ctx.body = {
        code: 0,
        data: null,
        msg: ''
      }
    }
  }
]
