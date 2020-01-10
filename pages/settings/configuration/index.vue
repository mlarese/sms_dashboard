<!--eslint-disable-->
<template>
    <Configuration/>
</template>
<script>
  import Configuration from '../../../components/Settings/Configuration'
  export default {
    components: {Configuration},
    fetch ({store}) {
      store.dispatch('configuration/load', {}, {root: true})
    }
  }
</script>
