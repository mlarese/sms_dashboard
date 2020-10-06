import axios from 'axios'
import {getSchema} from '../assets/helpers'

export default async function ({route, store, redirect, app}) {

  const schema = getSchema()
  const token = app.$auth.getToken(schema)
  let role = null;

  if (store.state.auth && store.state.auth.user && store.state.auth.user.role) {
    role = store.state.auth.user.role
  }

  if(role==='_Admin') {
    if(route.name==='leads' || route.name==='profile') {
      return redirect('/campaigns')
    }
  } else if(role==='Third Party Agency') {
    if(route.name!=='leads' && route.name!=='profile' && route.name!=='statistics') {
      return redirect('/leads')
    }
  }

  if (token) {
    store.commit('api/setToken', token, {root: true})
  } else {

  }

  if (!route.name) {
    return redirect('/login')
  } else if (route.name !== 'login') {
    if (!store.state.auth.loggedIn) {
      return redirect('/login')
    }
  }
}
