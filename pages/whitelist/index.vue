<template>
  <WhitelistList/>
</template>

<script>
  import WhitelistList  from '../../components/Whitelist/WhitelistList'
  const root = {root: true}

  export default {
    components: {WhitelistList},
    fetch ({store}) {
        store.dispatch('whitelist/load', {}, root)
    }
  }
</script>

<style>

</style>
