import Vue from 'vue'
import zoo from '@zoo'
import apis from '@apis'

Vue.use(zoo)
Vue.use(apis)

if (typeof window !== 'undefined') {
  window.__requestErrorCallback = (e, req) => {
    console.error(`接口请求失败[${req.url}]: ` + e)
  }

  window.Vue = Vue
}
