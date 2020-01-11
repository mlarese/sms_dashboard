<template>
  <LeadsList/>
</template>

<script>
  import LeadsList  from '../../components/Leads/LeadsList'
  const root = {root: true}

  export default {
    components: {LeadsList},
    fetch ({store}) {
        store.dispatch('leads/load', {}, root)
        store.dispatch('leads/loadAll', {}, root)
    }
  }
</script>

<style>

</style>
