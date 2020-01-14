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
    fetch({store, params}) {
      store.commit('usersBrands/setRecord',{},{root: true})
      store.commit('usersBrands/setAddMode',null,{root: true})

      store.dispatch('users/load',{},{root: true})
      store.dispatch('brands/load',{},{root: true})
      store.dispatch('usersBrands/load', {id: params.id}, {root: true})
    }
  }
</script>
