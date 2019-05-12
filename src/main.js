import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.styl'
Vue.config.productionTip = false

let eventBus = {
  install(Vue) {
    Vue.prototype.$bus = Vue
  }
}
Vue.use(eventBus)
Vue.use(Element)
new Vue({
  render: h => h(App),
}).$mount('#app')
