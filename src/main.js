import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(Vuex)

// 后端交互
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios
Vue.prototype.backendUrl = 'http://127.0.0.1:9507'
Vue.config.productionTip = false

// 状态管理
const store = new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
  	login: state => state.isLogin = true,
    logout: state => state.isLogin = false,
  }
})
Vue.prototype.$store = store

// 登录管理
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || store.state.isLogin) {
    next()
  }
  else{
    next(
      {
        path: '/login',
      }
    )
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
