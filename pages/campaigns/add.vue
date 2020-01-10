<!--eslint-disable-->
<template>
    <CampaignForms title="New Campaign" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import CampaignForms from '../../components/Campaigns/CampaignForms'
  export default {
    components: {
      CampaignForms
    },
    fetch({store}) {
        store.dispatch('brands/load', {}, {root: true}),
        store.dispatch('landingPages/load', {}, {root: true}),
        store.commit('campaigns/setRecord',{status_id: 4, cb_age_range: [1,2,3,4,5,6], cb_gender: 'All'},{root: true})
        store.commit('campaigns/setAddMode',null,{root: true})
    }
  }
</script>
