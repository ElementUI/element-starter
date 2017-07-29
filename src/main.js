import Vue from 'vue'
import '../theme/index.css'
import ElementUI from 'element-ui'
import App from './App'
import filter from './filter' // 加载路由
import router from './router' // 加载路由
import 'github-markdown-css'; //markdown css

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    fetch,
    render: h => h(App)
})