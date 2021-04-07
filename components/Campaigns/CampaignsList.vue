<!--eslint-disable-->
<template>
    <GridContainer title="Campaigns" >

        <div slot="header-right" v-if="isAdmin">
            <ButtonNew title="New Campaign" @click.native="addCampaign" />
        </div>

        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap >

                    <v-flex sm3  xs12>
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

                    <v-flex sm2 xs2>
                      <v-combobox style="margin-top:21px" dense  hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />

                    </v-flex>

                    <v-flex sm2 xs2>
                        <v-combobox style="margin-top:21px" dense  @change="onChannelChange" hide-details :label="$vuetify.t('Channel')"  :items="channelList" v-model="filter.channel_id" item-text="channel_name" item-value="channel_id" />

                    </v-flex>

                    <v-flex sm2 xs2>

                        <v-combobox style="margin-top:21px" dense hide-details :label="$vuetify.t('Sms Type')" :disabled="!filter.channel_id"  :items="filterSmsTypeByChannel"   v-model="filter.sms_type" />
                    </v-flex>


                </v-layout>
                <v-layout rows wrap class="mt-2" >
                    <v-flex  sm12 xs12>

                        <v-combobox
                          @change="onInputPostalCode"
                          multiple dense  class="hide-dropdown-icon" hide-details :label="$vuetify.t('Postal code')"  chips deletable-chips
                                        v-model="filter.postal_code"  />
                    </v-flex>
                </v-layout>
                <v-layout rows wrap class="mt-2" >

                    <v-flex   sm12 xs12>
                      <v-combobox
                        @change="onInputCity"
                        multiple dense  class="hide-dropdown-icon" hide-details :label="$vuetify.t('City')"  chips deletable-chips
                        v-model="filter.city"  />
                        <!-- v-autocomplete dense  hide-details :label="$vuetify.t('Region')" multiple chips deletable-chips :items="regions" v-model="filter.region"  /-->
                    </v-flex>
                </v-layout>
                <v-layout rows wrap class="mt-2">
                    <v-flex sm3 xs3><v-combobox dense  class=""  hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="filter.campaign_type" /></v-flex>
                    <v-flex sm2 xs3><v-combobox dense hide-details :label="$vuetify.t('CB Selection')"  :items="cbSelctionsList"   v-model="filter.cb_selection" /></v-flex>
                    <v-flex sm3 xs3><v-select dense  hide-details :label="$vuetify.t('Landing Page Type')"  :items="[{text:'One Click', value:1}, {text:'Two Clicks', value:2}]"   v-model="filter.lp_type" /></v-flex>
                    <v-flex sm2 xs3>
                        <v-combobox dense   hide-details :label="$vuetify.t('CB Activity Level')"   :items="['All', 'High', 'Medium', 'Low']" v-model="filter.cb_activity_level"  />
                    </v-flex>

                    <v-flex v-if="false" sm2 xs3><v-combobox dense  class=""   hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="filter.gender" /></v-flex>

                    <v-flex sm2 xs3 class="text-xs-right pa-0 pt-1">
                        <GridButton icon="search" color="blue" @click="doSearch" />
                        <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />
                    </v-flex>

                    <v-flex xs12   class="mt-2">
                        <v-select
                                dense
                                hide-details
                                :label="$vuetify.t('Age Range')"
                                :items="agesList"
                                multiple deletable-chips chips v-model="filter.cb_age_range"
                        />
                    </v-flex>

                  <v-flex xs12   class="mt-2 pb-0 text-xs-center">
                     <v-btn @click="createCluster" color="info" class="elevation-0">Create Cluster</v-btn>
                     <v-btn @click="createClusterRdcom" color="info" class="elevation-0">Create Cluster RDCOM</v-btn>
                  </v-flex>

                </v-layout>

            </div>
        </CardPanel>

        <v-layout v-if="false" slot="body-center" rows wrap>
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


        <v-layout slot="body-center" rows wrap >
            <v-flex xs2 sm1 class="text-xs-left mb-1" >
                <span class="statistic-high">SMS Type: High</span>
            </v-flex>
            <v-flex xs5 sm1 class="text-xs-left mb-1" >
                <span class="statistic-high">Results: <b>{{clicksListHigh.length|number}}</b> </span>
            </v-flex>
            <v-flex xs5 sm3 class="text-xs-left  mb-1" >
                <span class="statistic-high">Campaign Qty “One Click”: <b>{{total_1_ClikQty|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm3 class="text-xs-left  mb-1" >
                <span class="statistic-high">Campaign Qty “Two Click”: <b>{{total_2_ClikQty|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm2 class="text-xs-left  mb-1" >
                <span class="statistic-high">Processed Qty: <b>{{totalProcessedQty|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm1 class="text-xs-left  mb-1" >
                <span class="statistic-high">Leads: <b>{{totalLeadsQty|number}}</b></span>
            </v-flex>

            <v-flex xs6 sm1 class="text-xs-left  mb-1" >
                <span class="statistic-high">Conv. (%): <b>{{convPerc|number('0.000')}}</b></span>
            </v-flex>
        </v-layout>

        <v-layout slot="body-center" rows wrap class="mb-3">
            <v-flex xs2 sm1 class="text-xs-left mb-1" >
                <span class="statistic-low">SMS Type: Low</span>
            </v-flex>
            <v-flex xs5 sm1 class="text-xs-left mb-1" >
                <span class="statistic-low">Results: <b>{{clicksListLow.length|number}}</b> </span>
            </v-flex>
            <v-flex xs5 sm3 class="text-xs-left  mb-1" >
                <span class="statistic-low">Campaign Qty “One Click”: <b>{{total_1_ClikQtyLow|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm3 class="text-xs-left  mb-1" >
                <span class="statistic-low">Campaign Qty “Two Click”: <b>{{total_2_ClikQtyLow|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm2 class="text-xs-left  mb-1" >
                <span class="statistic-low">Processed Qty: <b>{{totalProcessedQtyLow|number}}</b></span>
            </v-flex>
            <v-flex xs6 sm1 class="text-xs-left mb-1" >
                <span class="statistic-low">Leads: <b>{{totalLeadsQtyLow|number}}</b></span>
            </v-flex>

            <v-flex xs6 sm1 class="text-xs-left  mb-1" >
                <span class="statistic-low">Conv. (%): <b>{{convPercLow|number('0.000')}}</b></span>
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
                <template slot="headers" >

                    <tr>
                        <th class="column sortable text-xs-left">ID</th>
                        <th class="column sortable text-xs-left">Brand</th>
                        <th class="column sortable text-xs-left">Status</th>
                        <th class="column sortable text-xs-left">Channel</th>
                        <th class="column sortable text-xs-left">Type</th>
                        <th class="column sortable text-xs-left">Create Date</th>
                        <th class="column sortable text-xs-left">Start Date</th>
                        <th class="column sortable text-xs-left">End Date</th>
                        <th class="column sortable text-xs-left">LP Name</th>
                        <th class="column sortable text-xs-left">LP Type</th>
                        <th class="column sortable text-xs-left">Age Range</th>
                        <th class="column sortable text-xs-left">City</th>
                        <th class="column sortable text-xs-left">CAP</th>
                        <!-- th class="column sortable text-xs-left">CB Activity</th-->
                        <th class="column sortable text-xs-left">Sms Type</th>
                        <th class="column sortable text-xs-left">Ca Qty</th>
                        <th class="column sortable text-xs-left">Pr Qty</th>
                        <th class="column sortable text-xs-left">Leads</th>
                        <th class="column sortable text-xs-left">Access (%)<br>Overall</th>
                        <th class="column sortable text-xs-left">Conv. (%)<br>Overall</th>
                        <th class="column sortable text-xs-left">Conv. (%)<br>8H</th>
                        <th class="column sortable text-xs-left">Conv. (%)<br>24H</th>
                        <th class="column sortable text-xs-left">Action</th>
                    </tr>

                </template>


                <template slot="items" slot-scope="{item}">
                    <td>{{ item.campaign_id }}</td>
                    <td>{{ item.brand_name }}</td>
                    <td>{{ item.status_name }}</td>
                    <td>{{ item.channel_name }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.creation_datetime | dmy}}<br> {{ item.creation_datetime  | time }} </td>
                    <td>{{ item.start_datetime | dmy}} <br>{{ item.start_datetime  | time }}</td>
                    <td>{{ item.end_datetime | dmy}} <br>{{ item.end_datetime  | time }}</td>
                    <td>{{ item.lp_name }}</td>
                    <td>{{ item.lp_type | lpType}}</td>
                    <td :title="getAgesRangesList(item.cb_age_range)" v-html="getAgesRanges(item.cb_age_range)"></td>
                    <td :title="getCityRangesList(item.city)" v-html="getCitesRanges(item.city)"></td>
                    <!--td :title="getRegionsRangesList(item.region)" v-html="getRegionsRanges(item.region)"></td-->
                    <td :title="getCapsRangesList(item.postal_code)" v-html="getCapsRanges(item.postal_code)"></td>

                    <!-- td>{{ item.cb_activity_level }}</td-->
                    <td>{{ item.sms_type }}</td>
                    <td>{{ item.cb_target_quantity | number}}</td>
                    <td>{{ item.cb_target_quantity_processed | number}}</td>
                    <td>{{ item.leads_count }}</td>
                    <td>
                        <span v-if="item.cb_target_quantity_processed>0">{{ item.access_overall/item.cb_target_quantity_processed | number('0.000%')}}</span>
                    </td>
                    <td>
                        <span v-if="item.cb_target_quantity_processed>0">{{ item.leads_count/item.cb_target_quantity_processed | number('0.000%')}}</span>
                    </td>
                    <td>
                        <span v-if="item.cb_target_quantity_processed>0">{{ item.conv_8/item.cb_target_quantity_processed | number('0.000%') }}</span>
                    </td>
                    <td>
                        <span v-if="item.cb_target_quantity_processed>0">{{ item.conv_24/item.cb_target_quantity_processed | number('0.000%') }}</span>
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
    import Brands from '../Settings/Brands'
    import Vue from 'vue'
    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer, DatePicker, Brands},
        data () {

            const headers = [
                { text: this.$vuetify.t('ID'), value: 'campaign_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand_name' },
                { text: this.$vuetify.t('Status'), value: 'status_name' },
                { text: this.$vuetify.t('CB Channel'), value: 'channel_name' },
                { text: this.$vuetify.t('Type'), value: 'type' },
                { text: this.$vuetify.t('Creation Date'), value: 'creation_datetime.date' },
                { text: this.$vuetify.t('Start Date'), value: 'start_datetime.date' },
                { text: this.$vuetify.t('End Date'), value: 'end_datetime.date' },
                { text: this.$vuetify.t('LP Name'), value: 'lp_name' },
                { text: this.$vuetify.t('LP Type'), value: 'lp_type' },
                { text: this.$vuetify.t('Age Range'), value: 'cb_age_range'},
                { text: this.$vuetify.t('City'), value: 'city' },
                //{ text: this.$vuetify.t('Region'), value: 'region' },
                { text: this.$vuetify.t('CAP'), value: 'postal_code' },
                // { text: this.$vuetify.t('CB Activity'), value: 'cb_activity_level' },
                { text: this.$vuetify.t('Sms Type'), value: 'sms_type' },
                { text: this.$vuetify.t('Ca Qty'), value: 'cb_target_quantity' },
                { text: this.$vuetify.t('Pr Qty'), value: 'cb_target_quantity_processed' },
                { text: this.$vuetify.t('Leads'), value: 'leads_count' },
                { text: this.$vuetify.t('Access (%) Overall'), width: 80, value: 'access_overall' },
                { text: this.$vuetify.t('Conv. (%) Overall'), width: 80, value: 'conversion' },
                { text: this.$vuetify.t('Conv. (%) 8H'), sortable: false, width: 80, value: 'conv_8' },
                { text: this.$vuetify.t('Conv. (%) 24H'),sortable: false,  width: 80, value: 'conv_24' },
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
            ...mapGetters('campaigns', ['agesListById', 'filterSmsTypeByChannel']),
            ...mapState('channels', {'channelList': 'list'}),
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('advformats', {'advformatsList': 'list'}),
            ...mapState('locations', {'states':'states','locationsList': 'list','regions':'regions'}),
            ...mapState('api', {'isAjax': 'isAjax'}),
            ...mapGetters('app', ['isAdmin']),
            convPerc() {
              if(this.totalProcessedQty === 0) return 0
              return this.totalLeadsQty/this.totalProcessedQty * 100
            },
            clicksListHigh () {
              if(!this.clicksList.filter) return []
              return this.clicksList.filter(o => o.sms_type === 'High') || []
            },
            clicksListLow () {
              if(!this.clicksList.filter) return []
              return this.clicksList.filter(o => o.sms_type === 'Low') || []
            },
            totalProcessedQty () {
                return _sumBy(this.clicksListHigh.filter(o => o.leads_count>0), 'cb_target_quantity_processed')
            },
            totalLeadsQty () {
                return _sumBy(this.clicksListHigh, 'leads_count')
            },
            total_1_ClikQty () {
                return _sumBy(this.clicksListHigh, 'counter_1_click')
            },
            total_2_ClikQty () {
                return _sumBy(this.clicksListHigh, 'counter_2_click')
            },

            totalProcessedQtyLow () {
              return _sumBy(this.clicksListLow.filter(o => o.leads_count>0), 'cb_target_quantity_processed')
            },
            totalLeadsQtyLow () {
              return _sumBy(this.clicksListLow, 'leads_count')
            },
            total_1_ClikQtyLow () {
              return _sumBy(this.clicksListLow, 'counter_1_click')
            },
            total_2_ClikQtyLow () {
              return _sumBy(this.clicksListLow, 'counter_2_click')
            },
            convPercLow() {
              if(this.totalProcessedQtyLow === 0) return 0
              return this.totalLeadsQtyLow/this.totalProcessedQtyLow * 100
            }

        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('campaigns', ['resetSearch', 'search','delete']),
            createClusterRdcom () {
              if(!confirm('Do you confirm RDCOM Cluster creation?')) return

              window.open('https://gtg.ai/crd/__srrrdcom.php')
            },
            createCluster () {
              if(!confirm('Do you confirm Cluster creation?')) return
              window.open('https://gtg.ai/crd/__srr.php')
            },
            onChannelChange () {
              Vue.set(this.filter,'sms_type',null)
            },
            onInputCity (item) {

              if(!item[item.length-1]) return
              let values = item[item.length-1].split(',')
              if(this.filter.city.length > values.length) return
              this.filter.city = [...values]

            },
            onInputPostalCode (item) {
              if(!item[item.length-1]) return
              let values = item[item.length-1].split(',')
              if(this.filter.postal_code.length > values.length) return
              this.filter.postal_code = [...values]

            },
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
            getCitesRanges (cities) {
              //console.dir(cities)
              let ret = '';
              if(cities) {
                if(cities.length === 0) ret = 'All'
                else if(cities.length === 1) ret = cities[0]
                else if(cities.length === 2) ret =  cities[0]+', '+cities[1]
                else if(cities.length > 2) ret =  cities[0]+', '+cities[1] + ' ...'
              } else {
                ret = 'All'
              }
              return ret
            },
            getCityRangesList (cities) {
              let totalList = ''
              if(!cities) return ''
              for (let i = 0; i<cities.length;i++) {
                totalList+= cities[i] + ' '
              }

              return totalList
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

<style>
    .statistic-high {color: #1565C0; font-size:12px;}
    .statistic-low {color: grey; font-size:12px;}
</style>


