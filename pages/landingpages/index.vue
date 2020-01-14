<template>
  <landing-pages-list/>
</template>

<script>
  import LandingPagesList  from '../../components/LandingPages/LandingPagesList'
  const root = {root: true}

  export default {
    components: {LandingPagesList},
    fetch ({store}) {
        store.dispatch('brands/load', {}, root)
        store.dispatch('landingPages/load', {}, root)
    }
  }
</script>

<style>

</style>
