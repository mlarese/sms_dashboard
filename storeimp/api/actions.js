import axios from 'axios'
import {mockApp, baseURL} from './api-properties'

if (mockApp) require('./mocks')

export const notifyError = (err, translate = null) => {
  let text = 'Error'
  let title = 'Error'
  let type = 'error'

  if (err.response.data && err.response.data.error_message) {
    text = err.response.data.error_message
  } else if (err.response.statusText) {
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

const addToken = () => {
  let options = {}

  let token = null
  if (localStorage.getItem('auth_token.prod'))
    token = localStorage.getItem('auth_token.prod')

  else if (localStorage.getItem('auth_token.dev'))
    token = localStorage.getItem('auth_token.dev')

  if (token) {
    if (token !== instance.defaults.headers.common['Authorization']) {
      instance.defaults.headers.common['Authorization'] = token
    }
  } else {
    instance.defaults.headers.common['Authorization'] = ''
    delete instance.defaults.headers.common['Authorization']
  }

  return instance
}

export const actions = {
  init ({commit}) {
    commit('error')
    commit('hasError')
  },
  get ({commit, getters}, {url, options = {}, debug = false}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')
    addToken()
    if (!options.headers) {
      //options.headers = {}
    }

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
  post ({commit, getters}, {url, data = {}, options = {}}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')
    addToken()
    console.log('---- post', url, data, options)

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
  put ({commit, getters}, {url, data, options = {}}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')

    console.log(url)
    addToken()
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
  delete ({commit, getters}, {url, options = {}}) {
    addToken
    commit('isAjax', true)
    commit('error')
    commit('hasError')
    console.log(url)

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
