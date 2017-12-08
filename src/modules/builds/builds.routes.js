import RootPage from './build.page.vue'
import NewBuildPage from './new-build.page.vue'

let buildsRoutes = [
  {
    path: '/builds',
    name: 'builds',
    component: RootPage
  },
  {
    path: '/new-build',
    name: 'new-build',
    component: NewBuildPage
  },
]

export default buildsRoutes
