import Vue from 'vue'
import Router from 'vue-router'

import About from '../views/About'
import Detail from '../views/Detail'
import Demo from '../views/Demo'
import Index from '../views/Index'
import Login from '../views/Login'
import Message from '../views/Message'
import Register from '../views/Register'
import Set from '../views/Set'
import Tip from '../views/Tip'
import Topic from '../views/Topic'
import Api from '../views/Api'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        }, {
            path: '/about',
            name: 'about',
            component: About
        }, {
            path: '/detail',
            name: 'datail',
            component: Detail
        }, {
            path: '/demo',
            name: 'demo',
            component: Demo
        }, {
            path: '/index',
            name: 'index',
            component: Index
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/message',
            name: 'message',
            component: Message
        }, {
            path: '/register',
            name: 'register',
            component: Register
        }, {
            path: '/set',
            name: 'set',
            component: Set
        }, {
            path: '/tip',
            name: 'tip',
            component: Tip
        }, {
            path: '/api',
            name: 'api',
            component: Api
        }, {
            path: '/topic',
            name: 'topic',
            component: Topic
        }
    ]
})