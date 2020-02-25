import _cloneDeep from 'lodash/cloneDeep'
import _keyBy from 'lodash/keyBy'

import Vue from 'vue'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

let today = new Date()
let fmtToday = format(today, 'yyyy-MM-dd')
const newFilter = () => ({
})
export const state = () => {
    return {
        list: [],
        recordList: [],
        targetQty: 0,
        record: {},
        $record: {},
        addRecord: {},
        resetItem: {},
        mode: 'list',
        searchActive: false,
        filter: newFilter()
    }
}

const root = {root: true}

export const mutations = {
  setRecordList (state, payload) { state.recordList = payload },
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
    resetFilter (state) {
      state.filter = newFilter()
    }

}
export const actions = {
    statistics ({dispatch, commit, state}, filter) {
      return dispatch('api/post', {url: `/api/cb_statistics`, data: filter}, root)
        .then(res => {
          commit('setRecord', res.data)
          return res
        })

    },

}

export const getters = {
}

