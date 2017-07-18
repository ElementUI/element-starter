import Vue from 'vue'
import '../theme/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
