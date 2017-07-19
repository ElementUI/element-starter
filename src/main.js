import Vue from 'vue'
import '../theme/index.css'
import ElementUI from 'element-ui'
import App from './App'
import filter from './filter' // 加载路由
import router from './router' // 加载路由
import fetch from './fetch' // 加载axios配置

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
