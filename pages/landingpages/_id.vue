<!--eslint-disable-->
<template>
    <LandingPageForms title="Edit Landing Page" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import LandingPageForms from '../../components/LandingPages/LandingPageForms'
  export default {
    components: {
      LandingPageForms
    },
    async fetch({store, params}) {
      store.commit('landingPages/setRecord',{},{root: true})
      store.commit('landingPages/setEditMode',null,{root: true})
      await store.dispatch('landingPages/load', {id: params.id}, {root: true})
    }
  }
</script>
