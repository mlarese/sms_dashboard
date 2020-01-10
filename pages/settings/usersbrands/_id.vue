<!--eslint-disable-->
<template>
    <FormCmp title="Edit User Brand" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import FormCmp from '../../../components/Settings/UserBrandForm'
  export default {
    components: {
      FormCmp
    },
    async fetch({store, params}) {
        store.commit('usersBrands/setRecord',{},{root: true})
        store.commit('usersBrands/setEditMode',null,{root: true})
        store.dispatch('roles/load',{},{root: true})
        await store.dispatch('usersBrands/load', {id: params.id}, {root: true})
    }
  }
</script>
