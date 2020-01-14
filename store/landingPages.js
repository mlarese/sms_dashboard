import _cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'
import addDays from "date-fns/addDays"
import format from 'date-fns/format'

let today = new Date()

const newFilter = () => ({
  creation_datetime: [format(addDays(today,-30), 'yyyy/MM/dd'), format(today,'yyyy/MM/dd')]
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
        filter: {}
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
        if (id === null) {
            return dispatch('api/get', {url: `/api/landing_pages`, options, debug: false}, root)
                .then(res => {
                    commit('setList', res.data)
                    return res
                })
        } else {
            const url = `/api/landing_pages/${id}`
            return dispatch('api/get', {url, options}, root)
                .then(res => {
                    commit('setRecord', res.data)
                    return res
                })
        }
    },
    delete ({dispatch, commit, state}, id) {
        const url = `/api/landing_pages/${id}`
        return dispatch('api/delete', {url}, root)
    },
    save ({dispatch, commit, state, getters}) {
        let data = state.$record

        if (getters.isAddMode) {
            return dispatch('api/post', {url: `/api/landing_pages`, data}, root)
                .then(r => {
                    commit('addRecord', data)
                    commit('set$Record', {})
                    return r
                })
        } else {
            let id = data.lp_id
            return dispatch('api/put', {url: `/api/landing_pages/${id}`, data}, root)
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
    isAddMode: state => state.mode === 'add'
}

