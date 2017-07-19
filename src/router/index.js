import Vue from 'vue'
import Router from 'vue-router'

import Demo from '../views/Demo'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'index',
        component: Demo
    }]
})