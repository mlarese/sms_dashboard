<template>
  <MsisdnList/>
</template>

<script>
  import MsisdnList  from '../../components/Msisdn/MsisdnList'
  const root = {root: true}

  export default {
    components: {MsisdnList},
    fetch ({store}) {
        store.dispatch('msisdn/load', {}, root)
    }
  }
</script>

<style>

</style>
