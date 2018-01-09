/* eslint-disable */
import axios from 'axios'
import config from '@/config'
import {isFailed} from '@/shared/api.utils'
import router from '@/router'

const templatesModule = {
  namespaced: true,
  state: {
    all: null
  },
  mutations: {
    updateTemplates(state, payload) {
      state.all = payload
    },

    updateSingleTemplate(state, payload) {
      let template = payload.template
      console.log('updateSingleTemplate', payload)
      let text_content = payload.text_content
      let html_content = payload.text_content

      if (!template.overridden) {
        template.overridden = {}
      }
      template.overridden.text_content = payload.text_content
      template.overridden.html_content = payload.html_content
    }
  },
  actions: {
    saveSingleTemplate(context, payload) {

      console.log('saveSingleTemplate', payload)
      let template = payload.template

      let dataToSend =  {
        token: localStorage.carrierToken,
        id: template.id,
        text_content: payload.text_content,
        html_content: payload.html_content
      }

      let promise = axios.post(config.set_carrier_template, dataToSend)

      console.log('payload', payload)

      context.commit('updateSingleTemplate', payload)

      return promise
    },
    load: function (context, payload) {
      console.log('Loading templates...')
      return new Promise((resolve, reject) => {
        let data
        let url
        url = config.url
        data = {
          token: localStorage.carrierToken
        }
        console.log('data', data)
        let promise = axios.post(config.get_carrier_templates, data)

        promise.then((response) => {
          if (isFailed(response)) {
            reject(response)
            return
          }

          // success
          context.commit('updateTemplates', response.data.data)

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

export default templatesModule
