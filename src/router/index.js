import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index'
import Detail from '../views/Detail'
import Demo from '../views/Demo'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/index'
        }, {
            path: '/index',
            name: 'index',
            component: Index
        }, {
            path: '/detail',
            name: 'datail',
            component: Detail
        }, {
            path: '/demo',
            name: 'demo',
            component: Demo
        }
    ]
})