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
        store.commit('campaigns/setRecord',{},{root: true})
        store.commit('campaigns/setAddMode',null,{root: true})
  },
    computed: {
    },
    methods: {
    }
  }
</script>

<style lang="scss">

</style>
