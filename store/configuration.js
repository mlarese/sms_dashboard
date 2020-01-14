import _cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

let today = new Date()
export const state = () => {
  return {
    list: [],
    timesList: [
      '00:00', '00:30','01:00', '01:30','02:00', '02:30','03:00', '03:30',
      '04:00', '04:30','05:00', '05:30','06:00', '06:30','07:00', '07:30',
      '08:00', '08:30','09:00', '09:30','10:00', '10:30','11:00', '11:30',
      '12:00', '12:30','13:00', '13:30','14:00', '14:30','15:00', '15:30',
      '16:00', '16:30','17:00', '17:30','18:00', '18:30','19:00', '19:30',
      '20:00', '20:30','21:00', '21:30','22:00', '22:30','23:00', '23:30',

    ],
    weekList: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
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
          return r
        })

  }
}

export const getters = {
  isEditMode: state => state.mode === 'edit',
  isAddMode: state => state.mode === 'add'
}

