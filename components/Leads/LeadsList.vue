<!--eslint-disable-->
<template>
    <GridContainer title="Leads">
        <div slot="header-right">
        </div>
        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap class="align-center">
                    <v-flex sm1 xs1 class="text-xs-right px-0">
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        +39
                    </v-flex>
                    <v-flex sm2 xs6>
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        <v-text-field dense   hide-details :label="$vuetify.t('MSISDN')"  v-model="filter.msisdn"   />

                    </v-flex>

                    <v-flex sm3 xs12  >
                        <div class="ml-2">
                            <span v-if="filter.creation_datetime && filter.creation_datetime[0]" class="active-label-size">Datetime</span>&nbsp;
                        </div>
                        <DatePicker value-type="YYYY-MM-DD" :placeholder="$vuetify.t('Datetime')" v-model="filter.creation_datetime" range></DatePicker>
                    </v-flex>

                    <v-flex sm2 xs6>
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        <v-autocomplete dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />

                    </v-flex>

                    <v-flex sm2 xs3>
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        <v-select dense  hide-details
                                  :label="$vuetify.t('Landing Page Type')"
                                  :items="[{text:'One Click', value:1}, {text:'Two Clicks', value:2}]"   v-model="filter.lp_type" /></v-flex>

                    <v-flex sm2 xs2 class="text-xs-left" >
                        <div style="margin-top:22px">
                            <GridButton icon="search" color="blue" @click="doSearch" />
                            <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex s12 class="text-xs-center">
                        <v-btn color="blue" dark class="elevation-1" @click="downloadCsv">Csv Export</v-btn>

                    </v-flex>
                </v-layout>

            </div>
        </CardPanel>

        <v-layout slot="body-center" rows wrap>
            <v-flex xs12 class="mb-1" style="color:grey">Total results: <b>{{leadsList.length|number}}</b></v-flex>


            <v-flex xs12>
                <v-data-table
                        :must-sort="true"
                        :rows-per-page-items="[100,200,500,{'text':'All','value':-1}]"
                        :loading="isAjax" fixed
                        :headers="headers"
                        :search="grid.pagination.search"
                        :items="leadsList"  :hide-actions="false"
                        :pagination.sync="grid.pagination"
                        class="elevation-0 fixed-header"
                >
                    <template slot="items" slot-scope="{item}">
                        <td>{{ item.campaign_id }}</td>
                        <td>{{ item.brand_name }}</td>
                        <td>{{ item.msisdn }}</td>
                        <td>{{ item.lp_type|lpType }}</td>
                        <td>{{ item.creation_datetime | dmy}} - {{ item.creation_datetime  | time }}</td>
                        <td><GridButton icon="cloud_download" color="blue" @click="onExportLog(item)" /></td>
                        <td><GridButton v-if="item.lp_type == 2" icon="cloud_download" color="blue" @click="onExportAccessLog(item)" /></td>
                    </template>
                    <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                        {{$vuetify.t('From')}} {{ pageStart }} {{$vuetify.t('To')}} {{ pageStop }}  {{$vuetify.t('of')}} {{ itemsLength }}
                    </template>

                </v-data-table>
            </v-flex>

        </v-layout>
    </GridContainer>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import {dmy,time,lpType} from '../../assets/filters'
    import GridButton from '../General/GridButton'
    import GridContainer from '../General/GridContainer'
    import CardPanel from "../General/CardPanel"
    import ButtonNew from "../General/ButtonNew"
    import DatePicker from 'vue2-datepicker'


    import {statusIdToText, statusList} from '../../assets/filters'
    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer, DatePicker},
        data () {
            const headers = [
                { text: this.$vuetify.t('Campaign ID'), value: 'campaign_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand' },
                { text: this.$vuetify.t('MSISDN'), value: 'msisdn' },
                { text: this.$vuetify.t('Lp Type'), value: 'lp_type' },
                { text: this.$vuetify.t('DateTime'), value: 'creation_datetime.date' },
                { text: 'Lead Log', value: 'action', sortable: false },
                { text: 'Access Log', value: 'action', sortable: false }
            ]
            return {
                sms_mo_date: null,
                click_date: null,
                gridFilter: '',
              statusList,
                headers
            }
        },
        computed: {
            ...mapState('leads', {'grid': 'grid', 'leadsList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('advformats', {'advformatsList': 'list'}),
            ...mapState('locations', {'locationsList': 'list'}),
            ...mapState('api', {'isAjax': 'isAjax'})

        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('leads', ['resetSearch', 'search','downloadCsv','downloadLog','downloadAccessLog']),
            statusIdToText,
            onExportAccessLog (item) {
              this.downloadAccessLog(item.row_id)
            },
            onExportLog (item) {
                this.downloadLog(item.row_id)
            },
            doSearch () {
                this.search()
            },
            doResetSearch () {
              this.resetSearch()

            }
        }
    }
</script>
