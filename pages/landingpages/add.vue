<!--eslint-disable-->
<template>
    <LandingPageForms title="New Landing Page" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import LandingPageForms from '../../components/LandingPages/LandingPageForms'
  import guid from 'uuid/v1'
  export default {
    components: {
        LandingPageForms
    },
    fetch({store}) {
        store.commit('landingPages/setRecord',{portout_flag:'N', guid: guid()},{root: true})
        store.commit('landingPages/setAddMode',null,{root: true})
    }
  }
</script>
