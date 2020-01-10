<template>
  <div>add</div>
</template>

<script>
  import RoleManagement from '../../../components/Roles/RoleManagement.vue'
  export default {
    components: {
        RoleManagement
    },
    fetch ({store}) {
      store.commit('roles/setRecord', {}, {root: true})
      store.commit('roles/setAddMode', null, {root: true})
    }
  }
</script>

<style>

</style>
