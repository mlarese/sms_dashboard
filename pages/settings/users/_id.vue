<template>
  <role-factory/>
</template>

<script>
  import {mapState} from 'vuex'
  import RoleFactory from '../../../components/Roles/RoleFactory'
  const module = 'roles'
  const root = {root: true}

  export default {
    components: {RoleFactory},
      computed: {
          ...mapState(module, ['$record'])
      },
    fetch ({store, params, query}) {
      const id = params.id
      const mode = query.mode

      if (!mode) {
        store.commit('roles/setEditMode', null, root)
      } else {
        store.commit('roles/setMode', mode, root)
      }
      return store.dispatch('roles/load', {id}, root)
    }
  }
</script>

<style>

</style>
