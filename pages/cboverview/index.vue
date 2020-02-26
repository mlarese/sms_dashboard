<template>
  <CbOverviewList />
</template>
<script>
  import CbOverviewList from '../../components/CbOverview/CbOverviewList'
  export default {
    components: {CbOverviewList},
    fetch ({store}) {
      store.dispatch('cboverview/statistics',{},{root: true})
    }
  }
</script>
