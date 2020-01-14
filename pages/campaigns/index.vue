<template>
  <CampaignsList/>
</template>

<script>
  import CampaignsList  from '../../components/Campaigns/CampaignsList'
  const root = {root: true}

  export default {
    components: {CampaignsList},
    fetch ({store}) {
        store.dispatch('brands/load', {}, root)
        store.dispatch('campaigns/search', {}, root)
    }
  }
</script>

<style>

</style>
