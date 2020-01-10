<!--eslint-disable-->
<template>
    <ListCmp/>
</template>
<script>
  import ListCmp from '../../../components/Settings/Users'
  export default {
    components: {ListCmp},
    fetch ({store}) {
      store.dispatch('users/load', {}, {root: true})
    }
  }
</script>
