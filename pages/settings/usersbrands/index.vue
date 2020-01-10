<!--eslint-disable-->
<template>
    <ListCmp/>
</template>
<script>
  import ListCmp from '../../../components/Settings/UsersBrands'
  export default {
    components: {ListCmp},
    fetch ({store}) {
      store.dispatch('usersBrands/load', {}, {root: true})
    }
  }
</script>
