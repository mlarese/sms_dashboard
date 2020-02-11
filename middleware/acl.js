import axios from 'axios'
import {getSchema} from '../assets/helpers'

export default async function ({route, store, redirect, app}) {

  const schema = getSchema()
  const token = app.$auth.getToken(schema)

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
