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
        console.log('payload.newValue === payload.oldValue')
        return;
      }
      console.log('updateSingleContent', payload)
      let content = payload.content

      if (content.overridden) {
        content.overridden.value = payload.newValue
      }
    }
  },
  actions: {
    saveSingleContent(context, payload) {
      if (payload.newValue === payload.oldValue) {
        console.log('payload.newValue === payload.oldValue')
        return;
      }
      console.log('saveSingleContent', payload)
      let content = payload.content

      let dataToSend =  {
        token: localStorage.carrierToken,
        id: content.id,
        value: payload.newValue
      }

      let promise = axios.post(config.set_carrier_content, dataToSend)

      console.log('payload', payload)

      context.commit('updateSingleContent', payload)

      return promise
    },
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
