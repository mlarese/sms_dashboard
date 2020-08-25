import axios from 'axios'
import {mockApp, baseURL} from './api-properties'

if (mockApp) require('./mocks')

export const notifyError = (err, translate = null) => {
  let text = 'Error'
  let title = 'Error'
  let type = 'error'

  if (err.response && err.response.data && err.response.data.error_message) {
    text = err.response.data.error_message
  } else if (err.response && err.response.statusText) {
    text = err.response.statusText
  } else if (err.message) {
    text = err.message
  }

  if (translate) {
    title = translate(title)
    text = translate(text)
  }
  return {title, text, type}
}

export const notifySuccess = ({title, text}) => ({title, text, type: 'success'})

const instance = axios.create({
  baseURL,
  timeout: 90000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})


export const actions = {
  init ({commit}) {
    commit('error')
    commit('hasError')
  },
  get ({commit, getters, state}, {url, options = {}, debug = false}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')

    if (!options.headers) {
      options.headers = {}
    }
    options.headers['Authorization'] = state.token
    if (debug) {
      console.log(baseURL + url, options)
    }
    return instance.get(url, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.dir(err)

        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  },
  post ({commit, getters, state}, {url, data = {}, options = {}}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')
    if (!options.headers) {
      options.headers = {}
    }
    options.headers['Authorization'] = state.token
    //console.log('---- post', url, data, options)

    return instance.post(url, data, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.log(err)
        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  },
  put ({commit, getters, state}, {url, data, options = {}}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')

    if (!options.headers) {
      options.headers = {}
    }
    options.headers['Authorization'] = state.token
    return instance.put(url, data, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.log(err)
        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  },
  delete ({commit, getters, state}, {url, options = {}}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')
    if (!options.headers) {
      options.headers = {}
    }
    options.headers['Authorization'] = state.token

    return instance.delete(url, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.log(err)
        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  }
}
