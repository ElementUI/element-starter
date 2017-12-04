/* eslint-disable */
import axios from 'axios'
import config from '@/config'
import {isFailed} from '@/shared/api.utils'
import router from '@/router'

const tokenKey = 'carrierToken'
const loginModule = {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem(tokenKey)
  },
  mutations: {
    updateToken (state, payload) {
      if (payload) {
        localStorage.setItem(tokenKey, payload)
        state.token = payload
      } else {
        localStorage.removeItem(tokenKey)
        state.token = null
      }

    },
    updateUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    logout: function (context, payload) {
      console.log('logout...')
      context.commit('updateUser', null)
      context.commit('updateToken', null)

      router.push({name: 'login'})
    },
    auth: function (context, payload) {
      console.log('auth...')
      return new Promise((resolve, reject) => {
        let data
        let url


        url = config.url
        data = {
          username: payload.username,
          password: payload.password,
        }
        let promise = axios.post(config.login_as_company_staff, data)

        promise.then((response) => {
          if (isFailed(response)) {
            reject(response)
            return
          }

          // success
          context.commit('updateToken', response.data.token)

          context.commit('updateUser', response.data.data)

          resolve(response)
        })
        promise.catch((e) => {
          reject(e)
        })
      })
    },
    init: function (context, payload) {
      let token = context.state.token
      return new Promise((resolve) => { //after login init done resolve promise in ANY case
          axios.post(config.get_carrier_user, { //recheck token
            token,
          }).then(
            (response) => {
              if (isFailed(response)) {
                context.commit('updateToken', null)
              }

              context.commit('updateUser', response.data.data)
              resolve()
            },
            (response) => {
              context.commit('updateToken', null)
              resolve()
            },
          )
      })
    },
  },
  getters: {},
}

export default loginModule
