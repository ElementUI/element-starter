import Vue from 'vue'
import Router from 'vue-router'
import LoginRoutes from '@/modules/login/login.routes'
import DashboardRoutes from '@/modules/dashboard/dashboard.routes'

import store from '@/store'

Vue.use(Router)

let router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    ...LoginRoutes,
    ...DashboardRoutes
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  }

  if (store.state.login.currentUser === null) {
    console.log('Not allowed to go to the route for unathorized person')
    next('/login')
  } else {
    next()
  }
})

export default router
