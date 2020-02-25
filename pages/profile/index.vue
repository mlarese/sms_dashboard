<template>
    <UserForm/>
</template>
<script>
  import UserForm from '../../components/Settings/UserForm'
  import {mapGetters} from 'vuex'

  const root = {root: true}
  export default {
    components: {UserForm},
    async fetch ({store}) {
      const userId = store.state.auth.user.userId
      await store.dispatch('users/load',{id: userId}, root)
    }
  }
</script>
