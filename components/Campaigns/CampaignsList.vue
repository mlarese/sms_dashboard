<!--eslint-disable-->
<template>
    <GridContainer title="Campaigns">
        <div slot="header-right" v-if="isAdmin">
            <ButtonNew title="New Campaign" @click.native="addCampaign" />
        </div>
        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap  >


                    <v-flex sm3 offset-sm1 xs12>
                        <div class="ml-2">
                        <span v-if="filter.creation_datetime && filter.creation_datetime[0]" class="active-label-size" >Creation Datetime</span>&nbsp;
                        </div>
                        <DatePicker value-type="YYYY-MM-DD" :placeholder="$vuetify.t('Creation datetime')" v-model="filter.creation_datetime" range></DatePicker>
                    </v-flex>

                    <v-flex sm3 xs12>
                        <div class="ml-2">
                            <span v-if="filter.start_datetime && filter.start_datetime[0]" class="active-label-size">Start Datetime</span>&nbsp;
                        </div>
                        <DatePicker value-type="YYYY-MM-DD" :placeholder="$vuetify.t('Start Datetime')" v-model="filter.start_datetime" range></DatePicker>
                    </v-flex>

                    <v-flex sm3 xs3>
                        <v-combobox style="margin-top:21px" dense  hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />

                    </v-flex>
                </v-layout>
                <v-layout rows wrap class="mt-2" >
                    <v-flex offset-sm1 sm9 xs12>
                        <v-combobox multiple dense  class="hide-dropdown-icon" hide-details :label="$vuetify.t('Postal code')"  chips deletable-chips
                                        v-model="filter.postal_code"  />
                    </v-flex>
                </v-layout>
                <v-layout rows wrap class="mt-2" >
                    <v-flex offset-sm1 sm9 xs12>
                        <v-autocomplete dense  hide-details :label="$vuetify.t('Region')" multiple chips deletable-chips :items="regions" v-model="filter.region"  />
                    </v-flex>
                </v-layout>
                <v-layout rows wrap class="mt-2">
                    <v-flex sm2 offset-sm1 xs3><v-combobox dense  class=""  hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="filter.campaign_type" /></v-flex>
                    <v-flex sm2 xs3><v-combobox dense hide-details :label="$vuetify.t('CB Selection')"  :items="cbSelctionsList"   v-model="filter.cb_selection" /></v-flex>
                    <v-flex sm2 xs3><v-select dense  hide-details :label="$vuetify.t('Landing Page Type')"  :items="[{text:'One Click', value:1}, {text:'Two Clicks', value:2}]"   v-model="filter.lp_type" /></v-flex>
                    <v-flex sm2 xs3>
                        <v-combobox dense   hide-details :label="$vuetify.t('CB Activity Level')"   :items="['All', 'High', 'Medium', 'Low']" v-model="filter.cb_activity_level"  />
                    </v-flex>

                    <v-flex v-if="false" sm2 xs3><v-combobox dense  class=""   hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="filter.gender" /></v-flex>

                    <v-flex sm2 xs3 class="text-xs-left pa-0 pt-1">
                        <GridButton icon="search" color="blue" @click="doSearch" />
                        <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />
                    </v-flex>

                    <v-flex xs9 offset-sm1 class="mt-2">
                        <v-select
                                dense
                                hide-details
                                :label="$vuetify.t('Age Range')"
                                :items="agesList"
                                multiple deletable-chips chips v-model="filter.cb_age_range"
                        />
                    </v-flex>

                </v-layout>

            </div>
        </CardPanel>

        <v-layout slot="body-center" rows wrap>
            <v-flex xs6 sm2 class="text-xs-center mb-1" style="color:grey">
                <span >Total Results: <b>{{clicksList.length|number}}</b> </span>
            </v-flex>
            <v-flex xs6 sm3 class="text-xs-center  mb-1" style="color:grey">
                <span >Total Campaign Qty “One Click”: <b>{{total_1_ClikQty|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm3 class="text-xs-center  mb-1" style="color:grey">
                <span >Total Campaign Qty “Two Click”: <b>{{total_2_ClikQty|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm2 class="text-xs-center  mb-1" style="color:grey">
                <span >Total Processed Qty: <b>{{totalProcessedQty|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm2 class="text-xs-center  mb-1" style="color:grey">
                <span >Total Leads: <b>{{totalLeadsQty|number}}</b></span>
            </v-flex>


        </v-layout>

        <v-layout slot="body-center" rows wrap>

            <v-flex xs12>

            <v-data-table
                    :must-sort="true"
                    :rows-per-page-items="[100,200,500,{'text':'All','value':-1}]"
                    :loading="isAjax" fixed
                    :headers="headers"
                    :search="grid.pagination.search"
                    :items="clicksList"  :hide-actions="false"
                    :pagination.sync="grid.pagination"
                    class="elevation-0 fixed-header"
            >
                <template slot="items" slot-scope="{item}">
                    <td>{{ item.campaign_id }}</td>
                    <td>{{ item.brand_name }}</td>
                    <td>{{ item.status_name }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.creation_datetime | dmy}}<br> {{ item.creation_datetime  | time }} </td>
                    <td>{{ item.start_datetime | dmy}} <br>{{ item.start_datetime  | time }}</td>
                    <td>{{ item.end_datetime | dmy}} <br>{{ item.end_datetime  | time }}</td>
                    <td>{{ item.lp_name }}</td>
                    <td>{{ item.lp_type | lpType}}</td>
                    <td :title="getAgesRangesList(item.cb_age_range)" v-html="getAgesRanges(item.cb_age_range)"></td>
                    <td :title="getRegionsRangesList(item.region)" v-html="getRegionsRanges(item.region)"></td>
                    <td :title="getCapsRangesList(item.postal_code)" v-html="getCapsRanges(item.postal_code)"></td>

                    <td>{{ item.cb_activity_level }}</td>
                    <td>{{ item.cb_target_quantity | number}}</td>
                    <td>{{ item.cb_target_quantity_processed | number}}</td>
                    <td>{{ item.leads_count }}</td>
                    <td>
                        <span v-if="item.cb_target_quantity_processed>0">{{ item.leads_count/item.cb_target_quantity_processed | number('0.000%')}}</span>
                    </td>

                    <td width="1" class="py-1 px-2">
                        <GridButton v-if="item.status_id==4" icon="delete" color="error" @click="onDelete(item)"></GridButton>
                    </td>

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
    import {mapState, mapActions, mapGetters} from 'vuex'
    import GridButton from '../General/GridButton'
    import GridContainer from '../General/GridContainer'
    import CardPanel from "../General/CardPanel";
    import ButtonNew from "../General/ButtonNew";
    import DatePicker from 'vue2-datepicker';
    import {statusIdToText, statusList} from '../../assets/filters'
    import _sumBy from 'lodash/sumBy'

    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer, DatePicker},
        data () {

            const headers = [
                { text: this.$vuetify.t('ID'), value: 'campaign_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand_name' },
                { text: this.$vuetify.t('Status'), value: 'status_name' },
                { text: this.$vuetify.t('Type'), value: 'type' },
                { text: this.$vuetify.t('Creation DateTime'), value: 'creation_datetime.date' },
                { text: this.$vuetify.t('Start DateTime'), value: 'start_datetime.date' },
                { text: this.$vuetify.t('End DateTime'), value: 'end_datetime.date' },
                { text: this.$vuetify.t('LP Name'), value: 'lp_name' },
                { text: this.$vuetify.t('LP Type'), value: 'lp_type' },
                { text: this.$vuetify.t('Age Range'), value: 'cb_age_range'},
                { text: this.$vuetify.t('Region'), value: 'region' },
                { text: this.$vuetify.t('CAP'), value: 'postal_code' },
                { text: this.$vuetify.t('CB Activity Level'), value: 'cb_activity_level' },
                { text: this.$vuetify.t('Campaign Qty'), value: 'cb_target_quantity' },
                { text: this.$vuetify.t('Processed Qty'), value: 'cb_target_quantity_processed' },
                { text: this.$vuetify.t('Leads'), value: 'leads_count' },
                { text: this.$vuetify.t('Conv. (%)'), value: 'conversion' },
                { text: 'Delete', value: 'action', sortable: false }
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
            ...mapState('campaigns', {'cbSelctionsList':'cbSelctionsList', 'agesList':'agesList', 'grid': 'grid', 'clicksList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
            ...mapGetters('campaigns', ['agesListById']),
            ...mapState('channels', {'channelList': 'list'}),
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('advformats', {'advformatsList': 'list'}),
            ...mapState('locations', {'states':'states','locationsList': 'list','regions':'regions'}),
            ...mapState('api', {'isAjax': 'isAjax'}),
            ...mapGetters('app', ['isAdmin']),
            totalProcessedQty () {
                return _sumBy(this.clicksList, 'cb_target_quantity_processed')
            },
            totalLeadsQty () {
                return _sumBy(this.clicksList, 'leads_count')
            },
            total_1_ClikQty () {
                return _sumBy(this.clicksList, 'counter_1_click')
            },
            total_2_ClikQty () {
                return _sumBy(this.clicksList, 'counter_2_click')
            }

        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('campaigns', ['resetSearch', 'search','delete']),
            statusIdToText,
            isOdd (num) { return num % 2;},
            onDelete (item) {
                if(!confirm('Do you confirm?')) return
                this.delete(item.campaign_id)
            },
            getAgesRanges (ages) {
                let ret = '';
                if(ages) {
                  if(ages.length === 0) ret = ''
                  else if(ages.length === 6) ret = 'All'
                  else if(ages.length === 1) ret = '['+this.agesListById[ages[0]].text+']'
                  else if(ages.length === 2) ret = '['+this.agesListById[ages[0]].text+']' +' ' + '['+this.agesListById[ges[1]].text+']'
                  else if(ages.length > 2) ret = '['+this.agesListById[ages[0]].text+']' +' ' + '['+this.agesListById[ages[1]].text+']' + ' ...'
                }
                return ret
            },
            getAgesRangesList (ages) {
                let totalList = ''
                for (let i = 0; i<ages.length;i++) {
                  totalList+= '['+this.agesListById[ages[i]].text + '] '
                }

                return totalList
            },
            getRegionsRanges (regions) {
                let ret = '';
                if(regions) {
                  if(regions.length === 0) ret = ''
                  else if(regions.length === 20) ret = 'All'
                  else if(regions.length === 1) ret = regions[0]
                  else if(regions.length === 2) ret =  regions[0]+' '+regions[1]
                  else if(regions.length > 2) ret =  regions[0]+' '+regions[1] + ' ...'
                }
                return ret
            },
            getRegionsRangesList (regions) {
                let totalList = ''
                if(!regions) return ''
                for (let i = 0; i<regions.length;i++) {
                  totalList+= regions[i] + ' '
                }

                return totalList
            },
            getCapsRanges (caps) {
                let ret = '';
                if(caps) {
                  if(caps.length === 0) ret = ''
                  else if(caps.length === 20) ret = 'All'
                  else if(caps.length === 1) ret = caps[0]
                  else if(caps.length === 2) ret =  caps[0]+' '+caps[1]
                  else if(caps.length > 2) ret =  caps[0]+' '+caps[1] + ' ...'
                }
                return ret
            },
            getCapsRangesList (caps) {
                let totalList = ''
                if(!caps) return ''
                for (let i = 0; i<caps.length;i++) {
                  totalList+= caps[i] + ' '
                }

                return totalList
            },
            doSearch () {
                this.search()
            },
            doResetSearch () {
              this.resetSearch()

            },
            addCampaign () {
              this.$router.push('/campaigns/add')
            }
        }
    }
</script>


