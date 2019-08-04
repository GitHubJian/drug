/**
 * enable 是否开启全局 mock
 * localPath 本地 mock 的文件夹
 * mockType mock方式 local | remote
 *    default: local
 * remotePrefix 远端服务器地址 default: mock
 */
module.exports = {
  enable: true,
  remotePrefix: '/mock',
  routerPrefix: '/item'
}
