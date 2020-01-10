<!--eslint-disable-->
<template>
    <FormCmp title="New User Brand" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import FormCmp from '../../../components/Settings/UserBrandForm'
  export default {
    components: {
      FormCmp
    },
    fetch({store}) {
        store.commit('usersBrands/setRecord',{},{root: true})
        store.commit('usersBrands/setAddMode',null,{root: true})
        store.dispatch('roles/load',{},{root: true})
    }
  }
</script>
