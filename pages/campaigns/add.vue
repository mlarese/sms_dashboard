<!--eslint-disable-->
<template>
    <CampaignForms title="New Campaign" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import CampaignForms from '../../components/Campaigns/CampaignForms'
  import {allRegions} from '../../store/locations'

  const regionsSet = allRegions()
  export default {
    components: {
      CampaignForms
    },
    fetch({store}) {
        store.dispatch('configuration/load', {}, {root: true}),
        store.dispatch('brands/load', {}, {root: true}),
        store.dispatch('landingPages/load', {}, {root: true}),
        store.commit('campaigns/setRecord',{region: regionsSet, cb_activity_level: 'All',status_id: 4, cb_age_range: [1,2,3,4,5,6], cb_gender: 'All',cb_selection:'Sequential'},{root: true})
        store.commit('campaigns/setAddMode',null,{root: true})
    }
  }
</script>
