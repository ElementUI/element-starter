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
    },

    updateSingleSetting(state, payload) {
      if (payload.newValue === payload.oldValue) {
        // do not send extra request
        return;
      }
      console.log('updateSingleSetting', payload)
      let setting = payload.setting

      let dataToSend =  {
        token: localStorage.carrierToken,
        id: setting.id,
        value: payload.newValue
      }

      axios.post(config.set_carrier_setting, dataToSend)
      console.log('payload', payload)
      if (setting.overridden) {
        setting.overridden.value = payload.newValue
      }
      payload.setting.default = payload.newValue
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
