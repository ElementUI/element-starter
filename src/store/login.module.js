/* eslint-disable */
import axios from 'axios'
import config from '@/config'
import {isFailed} from '@/shared/api.utils'
import router from '@/router'
const localstoragePinKey = 'auth.pin.nonce'

const loginModule = {
  namespaced: true,
  state: {
    currentUser: null
  },
  mutations: {
    updateToken (state, payload) {
      state.isAuthorized = Boolean(payload)
      if (payload) {
        localStorage.token = payload
      } else {
        localStorage.removeItem('token')
      }
    },
    updateCurrentUser(state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    logout: function (context, payload) {
      console.log('logout...')
      context.commit('updateCurrentUser', null)
      localStorage.removeItem('carrierToken')
      router.history.
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
          localStorage.setItem('carrierToken', response.token)
          context.commit('updateCurrentUser', response.data)

          resolve(response)
        })
        promise.catch((e) => {
          reject(e)
        })
      })
    },
    init: function (context, payload) {
      return new Promise((resolve) => { //after login init done resolve promise in ANY case
        context.commit('updateToken', localStorage.token)
        let nonce = localStorage.getItem('auth.pin.nonce')
        if (nonce) {
          context.commit('updatePinNonce', nonce)
        }
        if (context.state.isAuthorized) {
          axios.post(config.check_token_url, { //recheck token
            token: localStorage.token,
          }).then(
            () => {
              resolve()
            },
            () => {
              context.commit('updateToken', null)
              resolve()
            },
          )
        } else {
          resolve()
        }
      })
    },
    loginScreenWillShow (context, payload) {
      context.commit('updateLoginScreenState', true)
    },
    loginScreenDidHide (context, payload) {
      context.commit('updateLoginScreenState', false)
    },
    clearPinNonce (context, payload) {
      context.commit('updatePinNonce')

    },
  },
  getters: {},
}

export default loginModule
