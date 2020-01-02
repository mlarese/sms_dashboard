<!--eslint-disable-->
<template>
    <GridContainer title="Settings">
        <v-tabs slot="container-top"
                v-model="ui.currentTab"
                slider-color="yellow"
                show-arrows
        >
            <v-tab v-for="(item, i) in settingTabs" :key="i"  :to="'/'+item.to" >
                {{ $vuetify.t(item.label) }}
            </v-tab>
        </v-tabs>

    </GridContainer>
</template>
<script>
    import {mapState, mapGetters} from 'vuex'
    import GridContainer from '../General/GridContainer'


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

