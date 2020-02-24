<!--eslint-disable-->
<template>
    <GridContainer title="Statistics">
        <div slot="header-right">
        </div>
        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap class="align-center">

                    <v-flex offset-sm2 sm3 xs12  >
                        <div class="ml-2">
                            <span v-if="filter.creation_datetime && filter.creation_datetime[0]" class="active-label-size">Datetime</span>&nbsp;
                        </div>
                        <DatePicker value-type="YYYY-MM"
                                    :placeholder="$vuetify.t('Datetime')"
                                    type="month"
                                    v-model="filter.creation_datetime"
                        ></DatePicker>
                    </v-flex>

                    <v-flex sm4 xs6>
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        <v-autocomplete dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />

                    </v-flex>

                    <v-flex sm2 xs2 class="text-xs-left" >
                        <div style="margin-top:22px">
                            <GridButton icon="search" color="blue" @click="doSearch" />
                            <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />
                        </div>
                    </v-flex>
                </v-layout>
            </div>
        </CardPanel>

        <v-layout slot="body-center" rows wrap>

            <v-flex offset-sm4 sm4 xs12>

                <v-list one-line  dense>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="blue white--text">textsms</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Overall - SMS Sent</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="blue" text-color="white">{{ $record.overall_sms_sent | number}}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="blue white--text">textsms</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Lp "One-Click" - SMS Sent</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="blue" text-color="white">{{ $record.lp_1c_sms_sent | number}}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="blue white--text">textsms</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Lp "Two-Click" - SMS Sent</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="blue" text-color="white">{{ $record.lp_2c_sms_sent | number}}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-divider/>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="teal white--text">textsms</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Overall - Leads</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="teal" text-color="white">{{ $record.overall_leads| number }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="teal white--text">textsms</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Lp "One-Click" - Leads</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="teal" text-color="white">{{ $record.lp_1c_leads | number}}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="teal white--text">textsms</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Lp "Two-Click" - Leads</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="teal" text-color="white">{{ $record.lp_2c_leads| number }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-divider/>
                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="orange white--text">textsms</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Overall - Conversion (%)</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="orange" text-color="white">{{ $record.overall_conv|number('0.000%') }}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="orange white--text">textsms</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Lp "One-Click" - Conversion (%)</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="orange" text-color="white">{{ $record.lp_1c_conv | number('0.000%')}}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar @click="" >
                        <v-list-tile-avatar>
                            <v-icon class="orange white--text">textsms</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Lp "Two-Click" - Conversion (%)</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-chip color="orange" text-color="white">{{ $record.lp_2c_conv | number('0.000%')}}</v-chip>
                        </v-list-tile-action>
                    </v-list-tile>


                </v-list>

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

    import {statusIdToText, statusList} from '../../assets/filters'
    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer, DatePicker},
        data () {
          return {
            filter: {
              creation_datetime: currentYMD()
            }
          }
        },
        computed: {
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('campaigns', ['$record']),
            ...mapState('api', {'isAjax': 'isAjax'})
        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('campaigns', ['statistics', 'resetSearch']),
            statusIdToText,
            doSearch () {
                this.statistics(this.filter)
            },
            doResetSearch () {
              this.resetSearch()

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
