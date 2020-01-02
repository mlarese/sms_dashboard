<template>
  <CampaignsList/>
</template>

<script>
  import CampaignsList  from '../../components/Campaigns/CampaignsList'
  const root = {root: true}

  export default {
    components: {CampaignsList},
    async fetch ({store}) {
      let all = [
        store.dispatch('brands/load', {}, root),
        store.dispatch('channels/load', {}, root),
        store.dispatch('locations/load', {}, root),
        store.dispatch('advformats/load', {}, root)
      ]

      await Promise.all(all)
    }
  }
</script>

<style>

</style>
