import _cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

let today = new Date()
export const state = () => {
  return {
    list: [],
    timesList: [

    ],
    recordList: [],
    record: {},
    $record: {},
    addRecord: {},
    resetItem: {},
    grid: {pagination: {}},
    mode: 'list',
    searchActive: false,
    filter: {click_date: [today, today]}
  }
}

const root = {root: true}

export const mutations = {
  setSearchActive (state, payload) { state.searchActive = payload },
  setRecordList (state, payload) { state.recordList = payload },
  setPagination (state, payload) { state.pagination = payload },
  setList (state, payload) {
    state.list = payload
  },
  setRecord (state, payload) {
    state.record = _cloneDeep(payload)
    state.$record = _cloneDeep(payload)
    state.loaded = true
  },
  set$Record (state, payload) {
    state.$record = _cloneDeep(payload)
    state.loaded = true
  },
  updateItemList (state,  {data, index}) {
    Vue.set(state.list, index, data)
  },
  addRecord (state,  p ) {
    state.list.push(p)
  },
  reset$Record (state) {
    state.$record = {}
  },
  setMode (state, payload) { state.mode = payload },
  setForm (state, payload) { state.form = payload },
  setEditMode (state) { state.mode = 'edit' },
  setAddMode (state) { state.mode = 'add' }

}
export const actions = {
  load ({dispatch, commit, state}, {id = null, force = true, options = {}}) {
    if (!force && state.list.length > 0) {
      return
    }

    return dispatch('api/get', {url: `/api/configuration`, options, debug: false}, root)
      .then(res => {
        commit('setRecord', res.data)
        return res
      })

  },

  save ({dispatch, commit, state, getters}) {
    let data = state.$record

      let id = data.user_id
      return dispatch('api/put', {url: `/api/configuration`, data}, root)
        .then(r => {
          commit('addRecord', data)
          commit('set$Record', {})
          return r
        })

  }
}

export const getters = {
  isEditMode: state => state.mode === 'edit',
  isAddMode: state => state.mode === 'add'
}

