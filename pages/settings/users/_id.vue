<!--eslint-disable-->
<template>
    <FormCmp title="Edit User" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import FormCmp from '../../../components/Settings/UserForm'
  export default {
    components: {
      FormCmp
    },
    async fetch({store, params}) {
        store.commit('users/setRecord',{},{root: true})
        store.commit('users/setEditMode',null,{root: true})
        store.dispatch('roles/load',{},{root: true})
        await store.dispatch('users/load', {id: params.id}, {root: true})
    }
  }
</script>
