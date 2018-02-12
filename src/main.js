// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// eslint-disable-next-line
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from '@/store'
import '@/utils/axios.interceptors'
import '@/filters'

import './styles/main.scss'

import Header from './components/header.component.vue'
import BuildStatusLabel from './modules/builds/status-label.component.vue'

import AceEditor from './components/ace-editor.component.vue'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import moment from 'vue-moment'
Vue.component('icon', Icon)

Vue.config.productionTip = true

Vue.use(ElementUI)

Vue.use(moment)

Vue.component('ba-ace-editor', AceEditor)
Vue.component('ba-header', Header)
Vue.component('ba-status-label', BuildStatusLabel)

// to reduce bundle size
// npm install babel-plugin-component -D
// http://element.eleme.io/#/en-US/component/quickstart

/* eslint-disable no-new */
new Vue({
  el: '#js-vue-ba-portal',
  store,
  router,
  template: '<App/>',
  components: { App },
  created: function () {
    console.log('created')
  },

})
