<!--eslint-disable-->
<template>
    <GridContainer title="Cb Overview">
        <CardPanel slot_="container-top">
            <div class="">
                <v-layout rows wrap class="align-center">

                    <v-flex offset-sm5 sm2 xs12 class="" >
                        <div class="ml-2">
                            <span v-if="filter.last_contact_date && filter.last_contact_date[0]" class="active-label-size">Datetime</span>&nbsp;
                        </div>
                        <DatePicker value-type="YYYY-MM-DD"
                                    :placeholder="$vuetify.t('Datetime')"
                                    v-model="filter.last_contact_date"
                        ></DatePicker>


                    </v-flex>
                    <v-flex sm2 xs1  >
                        <div style="margin-top:20px"></div>
                        <GridButton icon="search" color="blue" @click="doSearch" />
                    </v-flex>
                </v-layout>
            </div>
        </CardPanel>

        <v-layout slot="body-center" rows wrap>

            <v-flex offset-sm4 sm4 xs12>

                <v-list one-line  dense>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="green white--text">people</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>CB Overall</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="green" text-color="white">{{ $record.overall  | number }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="blue white--text">people</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>CB Active</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="blue" text-color="white">{{ $record.active  | number }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="red white--text">people</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>CB Blacklist</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="red" text-color="white">{{ $record.black  | number }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="orange white--text">people</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>CB Port-Out</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="orange" text-color="white">{{ $record.portout | number }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <!--v-divider/>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="teal white--text">people</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>CB Last Contact Date</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="teal" text-color="white">{{ $record.last_date }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile-->

                </v-list>

            </v-flex>

            <v-flex xs12 class="mt-4">
                <v-progress-linear v-if="isAjax" :indeterminate="true"></v-progress-linear>
            </v-flex>
        </v-layout>
    </GridContainer>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import {dmy,time,lpType, currentYMD} from '../../assets/filters'
    import GridButton from '../General/GridButton'
    import GridContainer from '../General/GridContainer'
    import CardPanel from "../General/CardPanel"
    import ButtonNew from "../General/ButtonNew"
    import DatePicker from 'vue2-datepicker'

    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer, DatePicker},
        data () {
          return {
            filter: {
              last_contact_date: currentYMD()
            }
          }
        },
        computed: {
            ...mapState('cboverview', ['$record']),
            ...mapState('api', {'isAjax': 'isAjax'})
        },
        methods: {
            ...mapActions('cboverview', ['statistics']),
            doSearch () {
                this.statistics(this.filter)
            }
        }
    }
</script>

<style>
    .v-list--dense .v-list__tile__title {
        font-size:16px !important;
    }
    .v-list--dense .v-list__tile__sub-title {
        font-weight: bold !important;
        font-size:16px !important;
    }
    .v-chip {
        min_-width: 110px;
    }
    .v-chip__content {
        font-size:14px !important;
    }
</style>
