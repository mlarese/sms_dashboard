import axios from 'axios'
import {getSchema} from '../assets/helpers'

export default async function ({route, store, redirect, app}) {

  const schema = getSchema()
  const token = app.$auth.getToken(schema)

  if (token) {
    if (token !== axios.defaults.headers.common['Authorization']) {
      console.log('Adding token')
      axios.defaults.headers.common['Authorization'] = token
    }
  } else {
    console.log('removing token')
    axios.defaults.headers.common['Authorization'] = ''
    delete axios.defaults.headers.common['Authorization']
  }

  if (!route.name) {
    return redirect('/login')
  } else if (route.name !== 'login') {
    if (!store.state.auth.loggedIn) {
      return redirect('/login')
    }
  }
}
