import Vue from 'vue'
import entry from '{{ &entryPath }}/{{ &entryFileName }}'
// import { createRouter } from '{{ &entryPath }}/router'
// const router = createRouter()

{{#storeEnable}}
import { createStore } from '{{ &entryPath }}/store'
const store = createStore()
{{/storeEnable}}
// import { sync } from 'vuex-router-sync'

// sync(store, router)

export default new Vue({
  // router,
  {{#storeEnable}}
  store,
  {{/storeEnable}}
  el: '#app',
  render: h => h(entry)
})
