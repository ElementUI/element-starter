import Vue from 'vue'
import Router from 'vue-router'
import LoginRoutes from '@/modules/login/login.routes'
import DashboardRoutes from '@/modules/dashboard/dashboard.routes'
import BuildRoutes from '@/modules/builds/builds.routes'
import SettingsRoutes from '@/modules/settings/settings.routes'
import ContentRoutes from '@/modules/content/content.routes'
import AppearanceRoutes from '@/modules/appearance/appearance.routes'
import TemplatesRoutes from '@/modules/templates/templates.routes'

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
    ...DashboardRoutes,
    ...BuildRoutes,
    ...SettingsRoutes,
    ...ContentRoutes,
    ...AppearanceRoutes,
    ...TemplatesRoutes,
  ],
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (to.name === null) {
    next('/dashboard')
  }

  if (to.name === 'login') {
    next()
  }

  if (store.state.login.token === null) {
    console.log('Not allowed to go to the route for unathorized person')
    next('/login')
  } else {
    if (store.state.login.user === null) {
      console.log('user is null')
      store.dispatch('login/init')
        .then(() => {
          console.log('Init complete', store.state.login.user)
          next()
        },
        )
        .catch(() => next('/login'))
    } else {
      next()
    }
  }
})

export default router
