<template>
  <LeadsList/>
</template>

<script>
  import LeadsList  from '../../components/Leads/LeadsList'
  const root = {root: true}

  export default {
    components: {LeadsList},
    fetch ({store}) {
        store.commit('leads/setList', [], root)
        store.commit('leads/resetFilter', null , root)
        store.dispatch('brands/loadByUser', {}, root)
        store.dispatch('leads/search', {}, root)
    }
  }
</script>

<style>

</style>
