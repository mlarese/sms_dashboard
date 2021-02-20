<!--eslint-disable-->
<template>
  <div>
    <Brands/>
  </div>

</template>
<script>
  import Brands from '../../../components/Settings/Brands'
  export default {
    components: {Brands},
    fetch ({store}) {
      store.dispatch('brands/load', {}, {root: true})
    }
  }
</script>
