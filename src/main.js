import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store'

Vue.config.productionTip = false

//轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 图表库
import VCharts from 'v-charts'
Vue.use(VCharts)

// 全局过滤器
import filters from './filters'

import './plugins/element.js'
Object.keys(filters).forEach((filterName) => {
  Vue.filter(filterName, filters[filterName])
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
