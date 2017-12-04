/* eslint-disable */
import axios from 'axios'
import config from '@/config'
import {isFailed} from '@/shared/api.utils'
import router from '@/router'

const contentModule = {
  namespaced: true,
  state: {
    all: null
  },
  mutations: {
    updateContent(state, payload) {
      state.all = payload
    },

    updateSingleContent(state, payload) {
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
      console.log('Loading content...')
      return new Promise((resolve, reject) => {
        let data
        let url
        url = config.url
        data = {
          token: localStorage.carrierToken
        }
        console.log('data', data)
        let promise = axios.post(config.get_carrier_content, data)

        promise.then((response) => {
          if (isFailed(response)) {
            reject(response)
            return
          }

          // success
          context.commit('updateContent', response.data.data)

          resolve(response)
        })
        promise.catch((e) => {
          reject(e)
        })
      })
    },
  },
  getters: {},
}

export default contentModule
