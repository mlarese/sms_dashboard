<!--eslint-disable-->
<template>
    <LandingPageForms title="New Landing Page" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import LandingPageForms from '../../components/LandingPages/LandingPageForms'
  export default {
    components: {
        LandingPageForms
    },
    fetch({store}) {
        store.dispatch('brands/load', {}, {root: true}),
        store.dispatch('landingPages/load', {}, {root: true}),
        store.commit('landingPages/setRecord',{status_id: 4, cb_age_range: [1,2,3,4,5,6], cb_gender: 'All'},{root: true})
        store.commit('landingPages/setAddMode',null,{root: true})
    }
  }
</script>
