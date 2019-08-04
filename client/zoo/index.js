import './css/reset.css'
import './css/index.scss'

import qs from './utils/qs.js'

import components from './components'

const install = (Vue, options = {}) => {
  components.forEach(c => {
    Vue.component(c.name, c)
  })

  Vue.prototype.$qs = qs
}

export default {
  install
}
