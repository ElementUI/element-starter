import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routeOptions = [
  {path: '/', component: 'Home'},
  {path: '/about', component: 'About'},
  {path: '/login', component: 'Login'},
  {path: '/record', component:'Record'},
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () => import(`../components/${route.component}.vue`)
  }
})

export default new Router({
  routes: routes,
  mode: 'history'
})
