<!--eslint-disable-->
<template>
    <GridContainer title="Statistics">
        <v-tabs slot="container-top"
                class="mb-2 sub-tabs"
                v-model="ui.currentTab"
                slider-color="grey"
                show-arrows
        >
            <v-tab   to="/statistics/bycampaigns" > By Campaigns </v-tab>
            <v-tab   to="/statistics/byleads" > By Leads </v-tab>
        </v-tabs>

        <nuxt-child slot="body-center"/>
    </GridContainer>
</template>

<script>
  import {mapState} from 'vuex'
  import GridContainer from '../components/General/GridContainer'


  export default {
    components: {GridContainer},
    data () {
      return {
        gridFilter: '',
      }
    },
    computed: {
      ...mapState('settApp', ['settingTabs', 'ui'])
    },
    methods: {
      onClick () {
        alert('onClick')
      }
    }
  }
</script>

