/* eslint-disable */
import axios from 'axios'
import config from '@/config'
import {isFailed} from '@/shared/api.utils'
import router from '@/router'

const settingsModule = {
  namespaced: true,
  state: {
    all: null
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
    updateSettings(state, payload) {
      state.all = payload
    }
  },
  actions: {
    load: function (context, payload) {
      console.log('Loading settings...')
      return new Promise((resolve, reject) => {
        let data
        let url
        url = config.url
        data = {
          token: localStorage.carrierToken
        }
        console.log('data', data)
        let promise = axios.post(config.get_carrier_settings, data)

        promise.then((response) => {
          if (isFailed(response)) {
            reject(response)
            return
          }

          // success
          context.commit('updateSettings', response.data.data)

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

export default settingsModule
