import _cloneDeep from 'lodash/cloneDeep'
import _keyBy from 'lodash/keyBy'

import Vue from 'vue'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'


export const state = () => {
    return {
        list: [],
        recordList: [],
        targetQty: 0,
        record: {},
        $record: {},
        mode: 'list'
    }
}

const root = {root: true}

export const mutations = {
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

    setMode (state, payload) { state.mode = payload },
    setEditMode (state) { state.mode = 'edit' },
    setAddMode (state) { state.mode = 'add' }

}
export const actions = {
  loadByCampaignId ({dispatch, commit, state}, campaignId) {
    return dispatch('api/get', {url: `/api/campaignslpaccess/${campaignId}`}, root)
      .then(res => {
        commit('setList', res.data)
        return res
      })

  },
}

export const getters = {
    filterSmsTypeByChannel: state => {
      if(!state.filter.channel_id) return []
      if(state.filter.channel_id.sms_low_quality) return ['Low']
      if(state.filter.channel_id.sms_high_quality) return ['High']
      return ['Low', 'High']

    },
    $recordSmsTypeByChannel: state => {
      if(!state.$record.channel_id) return []
      if(state.$record.channel_id.sms_low_quality) return ['Low']
      if(state.$record.channel_id.sms_high_quality) return ['High']
      return ['Low', 'High']

    },
    agesListById: state => _keyBy (state.agesList, 'value'),
    isEditMode: state => state.mode === 'edit',
    isAddMode: state => state.mode === 'add'
}

