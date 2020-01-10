<!--eslint-disable-->
<template>
    <BrandForm title="New Brand" />
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import BrandForm from '../../../components/Settings/BrandForm'
  export default {
    components: {
      BrandForm
    },
    fetch({store}) {
        store.commit('brands/setRecord',{},{root: true})
        store.commit('brands/setAddMode',null,{root: true})
    }
  }
</script>
