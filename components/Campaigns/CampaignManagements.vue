<!--eslint-disable-->
<template>
    <v-flex container pa-0>
        <v-card>
            <campaign-forms/>
        </v-card>
    </v-flex>
</template>

<script>
  import CampaignForms from './CampaignForms'
  import {mapState, mapActions} from 'vuex'

  export default {
      components: {
          CampaignForms
      },
      computed: {
        ...mapState('campaigns', ['$record', 'record'])
      },
      methods: {
        ...mapActions('campaigns', ['save'])
    }
  }
</script>

<style>

</style>
