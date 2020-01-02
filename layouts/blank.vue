<!--eslint-disable-->
<template>
  <v-app id="inspire" class="grey lighten-2" >
    <notifications position="top right" style="margin-top:50px"/>
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    layout: 'empty',
    computed: {
      ...mapState('app', ['title']),
      ...mapState('api', ['notification'])
    },
    watch: {
      'notification.id' (val) {
        this.$notify(this.notification)
      }
    }
  }
</script>
