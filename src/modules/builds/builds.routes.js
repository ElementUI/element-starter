import RootPage from './build.page.vue'
import NewBuildPage from './new-build.page.vue'
import BuildDetailPage from './build-details.page.vue'

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
  {
    path: '/build-details/:buildId',
    name: 'build-details',
    component: BuildDetailPage
  },
]

export default buildsRoutes
