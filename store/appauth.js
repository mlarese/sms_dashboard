export const state = () => ({
  user: 'admin',
  role: 'admin',
  signingIn: false,
  loggedIn: false,
  counter: 0
})

export const mutations = {
  setSigningIn (s, p) { s.signingIn = p },
  setLoggedIn (s, p) { s.loggedIn = p },
  setUser (s, p) { s.user = p },
  setCounter (s) { s.counter++ },
  setRole (s, p) { s.role = p }
}

export const actions = {
  logout ({commit, state, dispatch}) {
    commit('setSigningIn', false)
    return dispatch('api/get', {url: '/logout'}, {root: true})
      .then(res => {
        commit('setUser', null)
        commit('setLoggedIn', false)
        window.location = '/monitor/res'
      })
  },
  checkProfile ({commit, state, dispatch}) {
    return dispatch('api/get', {url: '/profile'}, {root: true})
      .then(res => {
        commit('setUser', res.data.user)
        commit('setRole', res.data.role)
        commit('setLoggedIn', res.data.logged)
        commit('setSigningIn', false)
      })
      .catch(e => {
        commit('setSigningIn', false)
      })
  },
  loadProfile ({commit, state, dispatch}) {
    return dispatch('api/get', {url: '/profile'}, {root: true})
      .then(res => {
        commit('setUser', res.data.user)
        commit('setRole', res.data.role)
        commit('setLoggedIn', res.data.logged)

        if (!res.data.logged) {
          alert('User not found')
        }
        commit('setSigningIn', false)
        // window.location = '/monitor/res'
      })
      .catch(e => {
        commit('setSigningIn', false)
      })
  }
}

export const getters = {
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
