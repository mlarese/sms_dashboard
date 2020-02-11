import _cloneDeep from 'lodash/cloneDeep'
import _keyBy from 'lodash/keyBy'

import Vue from 'vue'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

let today = new Date()
let fmtToday = format(today, 'yyyy-MM-dd')
const cbSelctionsList = ['Sequential']
const newFilter = () => ({
  creation_datetime: [fmtToday, fmtToday],
  start_datetime: [fmtToday, fmtToday],
  cb_age_range: [1,2,3,4,5,6],
  cb_selection: cbSelctionsList[0]
})
export const state = () => {
    return {
        list: [],
        recordList: [],
        record: {},
        $record: {},
        addRecord: {},
        resetItem: {},
        grid: {
            pagination: {
              search: '',
              descending: true,
              page: 1,
              pages: 0,
              rowsPerPage: 100,
              totalItems: 0
            }
        },
        agesList: [
          {text:'0-18', value: 1},
          {text:'19-25', value: 2},
          {text:'26-35', value: 3},
          {text:'36-45', value: 4},
          {text:'46-55', value: 5},
          {text:'>55', value: 6}
        ],
        cbSelctionsList,
        statusList: [
          {value: 4,  text: 'Pending'},
          {value: 5,  text: 'Running'},
          {value: 6,  text: 'Ended'}
        ],
        mode: 'list',
        searchActive: false,
        filter: newFilter()
    }
}

const root = {root: true}

export const mutations = {
    setPagination (state) {
        state.grid.pagination.totalItems = state.list.length
        state.grid.pagination.page = 1
        state.grid.pagination.pages = Math.ceil(state.grid.pagination.totalItems / state.grid.pagination.rowsPerPage)
    },
    setSearchActive (state, payload) { state.searchActive = payload },
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
    setMode (state, payload) { state.mode = payload },
    setForm (state, payload) { state.form = payload },
    setEditMode (state) { state.mode = 'edit' },
    setAddMode (state) { state.mode = 'add' },
    resetFilter (state) {
      state.filter = newFilter()
    }

}
export const actions = {
    update ({dispatch, commit, state}, {data, id}) {
        const url = `/campaigns/${id}`
        return dispatch('api/put', {url, data}, root)
            .then(() => {
                commit('setAddMode')
            })
    },
    insert ({dispatch, commit}, {data}) {
        const url = `/campaigns`
        return dispatch('api/post', {url, data}, root)
    },
    search ({dispatch, commit, state}) {
      let data = state.filter
      commit('setList', [])
      return dispatch('api/post', {url: `/api/campaigns_search`, data}, root)
        .then(res => {
          commit('setList', res.data)
          commit('setPagination')
          commit('setSearchActive', true)
          return res
        })
    },
    reporting ({dispatch, commit, state}) {
      let data = state.filter
      commit('setList', [])
      return dispatch('api/post', {url: `/campaigns`, data}, root)
        .then(res => {
          commit('setList', res.data)
          commit('setPagination')
          commit('setSearchActive', true)
          return res
        })
    },
    save ({dispatch, commit, state, getters}) {
        let data = state.$record

        if (getters.isAddMode) {
            return dispatch('api/post', {url: `/api/campaigns`, data}, root)
                .then(r => {
                    commit('addRecord', data)
                    commit('set$Record', {})
                    return r
                })
        } else {
            let id = data.code
            return dispatch('update', {data, id})
              .then(r => {
                commit('addRecord', data)
                commit('set$Record', {})
                return r
              })



        }
    },
    delete ({dispatch, commit, state, getters},id) {
      return dispatch('api/delete', {url: `/api/campaigns/${id}`}, root)
          .then(r => {
            dispatch('search')
            return r
          })

    },
    add ({dispatch, commit}, {data}) {
        const url = `/campaigns`
        return dispatch('api/post', {url, data}, root)
    },
    edit({commit}, item) {
        commit('set$Record', item)
        commit('setAddMode', {item, active:false})
    },
    resetSearch ({dispatch, commit, state}) {
        commit('setSearchActive', false)
        commit('resetFilter')
        commit('setList', [])
    },
    loadAll ({dispatch, commit, state}, {id = null, force = true, options = {}}) {
        if (!force && state.loaded) {
            return
        }
        if (id === null) {
            return dispatch('api/post', {url: `/api/campaigns_load`, options, debug: false}, root)
                .then(res => {
                    commit('setList', res.data)
                    commit('setPagination')
                    return res
                })
        } else {
            return dispatch('api/get', {url: `/api/campaigns/{id}`, options}, root)
                .then(res => {
                    commit('setRecord', res)
                    return res
                })
        }
    },
}

export const getters = {
    agesListById: state => _keyBy (state.agesList, 'value'),
    isEditMode: state => state.mode === 'edit',
    isAddMode: state => state.mode === 'add'
}

