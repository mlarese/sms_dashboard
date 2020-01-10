<!--eslint-disable-->
<template>
    <FormCmp title="New User" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import FormCmp from '../../../components/Settings/UserForm'
  export default {
    components: {
      FormCmp
    },
    fetch({store}) {
        store.commit('users/setRecord',{},{root: true})
        store.commit('users/setAddMode',null,{root: true})
        store.dispatch('roles/load',{},{root: true})
    }
  }
</script>
