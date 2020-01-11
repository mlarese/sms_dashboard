<!--eslint-disable-->
<template>
    <v-flex container pa-0>
        <v-card>
            <landing-page-forms/>
        </v-card>
    </v-flex>
</template>

<script>
  import LandingPageForms from './LandingPageForms'
  import {mapState, mapActions} from 'vuex'

  export default {
      components: {
          LandingPageForms
      },
      computed: {
        ...mapState('landingPages', ['$record', 'record'])
      },
      methods: {
        ...mapActions('landingPages', ['save'])
    }
  }
</script>

<style>

</style>
