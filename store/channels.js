export const state = () => {
    return {
        list: []
    }
}

const root = {root: true}

export const mutations = {
    setList (state, payload) {
        state.list = payload
    }
}

export const actions = {

    load ({dispatch, commit, state}, {force = true, options = {}}) {
        if (!force && state.list.length > 0) {
            return
        }

        return dispatch('api/get', {url: `/api/channels`, options, debug: false}, root)
            .then(res => {
                commit('setList', res.data)
                return res
            })

    }
}

export const getters = {
}

