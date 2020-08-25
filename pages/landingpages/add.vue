<!--eslint-disable-->
<template>
    <LandingPageForms title="New Landing Page" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import LandingPageForms from '../../components/LandingPages/LandingPageForms'
  import {noImageLpPlaceholder} from '../../assets/consts'
  import guid from 'uuid/v1'
  export default {
    components: {
        LandingPageForms
    },
    fetch({store}) {
        store.dispatch('brands/load', {}, {root: true})
        store.commit('landingPages/setRecord',{guid: guid(), button_element: noImageLpPlaceholder},{root: true})
        store.commit('landingPages/setAddMode',null,{root: true})
    }
  }
</script>
