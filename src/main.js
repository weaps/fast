import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import HTTP from './api/http'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.styl'
import 'echarts/extension/bmap/bmap' // 百度地图依赖文件
Vue.config.productionTip = false
Vue.prototype.API = HTTP
Vue.prototype.$echarts = echarts
let eventBus = {
  install(Vue) {
    Vue.prototype.$bus = Vue
  }
}
Vue.use(eventBus, Element)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
