import _cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'
import addDays from "date-fns/addDays";
import format from 'date-fns/format'

let today = new Date()
const sToday = format(today,'yyyy-MM-dd')

const newFilter = () => ({

  creation_datetime: [sToday, sToday]
})

export const state = () => {
    return {
        list: [],
        recordList: [],
        record: {},
        $record: {},
        addRecord: {},
        resetItem: {},
        grid: {pagination: {}},
        mode: 'list',
        searchActive: false,
        filter: {click_date: newFilter()}
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
      resetFilter (state) {
        state.filter = newFilter()
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
        if (id === null) {
            return dispatch('api/get', {url: `/api/leads`, options, debug: false}, root)
                .then(res => {
                    commit('setList', res.data)
                    return res
                })
        } else {
            const url = `/api/leads/${id}`
            return dispatch('api/get', {url, options}, root)
                .then(res => {
                    commit('setRecord', res.data)
                    return res
                })
        }
    },
    delete ({dispatch, commit, state}, id) {
      const url = `/api/leads/${id}`
      return dispatch('api/delete', {url}, root)
    },

    downloadCsv ({dispatch, commit, state}) {
      const url = `/api/leadscsv`
      let data = state.filter
      return dispatch('api/post', {url, data}, root)
        .then(res => {
            window.location='https://gtg.ai/'+res.data.file
            return res
        })
    },
    downloadAccessLog ({dispatch, commit, state}, id) {


      const rec = state.list.find(o => o.row_id === id)

      const str = `{"cid":${rec.campaign_id}, "m": "${rec.msisdn_full}"}`
      let b64 = encodeURI(  btoa(str) )

      const b64b = decodeURI(  atob(b64) )
      //console.log(str, b64, b64b)
      const url = `/api/leadsaccesslog/${b64}`

      let data = state.filter
      return dispatch('api/get', {url}, root)
        .then(res => {

          window.location='https://gtg.ai/'+res.data.file
          return res
        })
    },
    downloadLog ({dispatch, commit, state}, id) {
      const url = `/api/leadslog/${id}`
      let data = state.filter
      return dispatch('api/get', {url}, root)
        .then(res => {
          window.location='https://gtg.ai/'+res.data.file
          return res
        })
    },
    search ({dispatch, commit, state}) {
        let data = state.filter
        commit('setList', [])
        return dispatch('api/post', {url: `/api/leads_search`, data}, root)
          .then(res => {
            commit('setList', res.data)
            commit('setPagination')
            commit('setSearchActive', true)
            return res
          })
    },

    resetSearch ({dispatch, commit, state}) {
        commit('setSearchActive', false)
        commit('resetFilter')
        commit('setList', [])
    },

    save ({dispatch, commit, state, getters}) {
        let data = state.$record

        if (getters.isAddMode) {
          return dispatch('api/post', {url: `/api/leads`, data}, root)
            .then(r => {
              commit('addRecord', data)
              commit('set$Record', {})
              return r
            })
        } else {
          let id = data.lead_id
          return dispatch('api/put', {url: `/api/leads/${id}`, data}, root)
            .then(r => {
              commit('addRecord', data)
              commit('set$Record', {})
              return r
            })



        }
    }
}

export const getters = {
    isEditMode: state => state.mode === 'edit',
    isAddMode: state => state.mode === 'add',
    filteredList: state => state.list
}

