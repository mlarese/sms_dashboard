<!--eslint-disable-->
<template>
    <GridContainer title="Campaigns">
        <div slot="header-right">
            <ButtonNew title="New Campaign" @click.native="addCampaign" />
        </div>
        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap>
                    <pre v-if="false">
                        Age Range :
                        CB Activity Level :
                        Status :
                    </pre>

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
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        <v-combobox dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />

                    </v-flex>



                </v-layout>
                <v-layout rows wrap>
                    <v-flex sm2 offset-sm1 xs3><v-combobox dense  class=""  hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="filter.campaign_type" /></v-flex>
                    <v-flex sm2 xs3><v-combobox dense hide-details :label="$vuetify.t('CB Selection')"  :items="['Random', 'Sequential']"   v-model="filter.cb_selection" /></v-flex>
                    <v-flex sm2 xs3><v-select dense  hide-details :label="$vuetify.t('Landing Page Type')"  :items="[{text:'One Click', value:1}, {text:'No Click', value:2}]"   v-model="filter.lp_type" /></v-flex>
                    <v-flex sm2 xs3>
                        <v-combobox dense   hide-details :label="$vuetify.t('CB Activity Level')"   :items="['All', 'High', 'Medium', 'Low']" v-model="filter.cb_activity_level"  />
                    </v-flex>

                    <v-flex v-if="false" sm2 xs3><v-combobox dense  class=""   hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="filter.gender" /></v-flex>

                    <v-flex sm2 xs3 class="text-xs-left pa-0 pt-1">
                        <GridButton icon="search" color="blue" @click="doSearch" />
                        <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />
                    </v-flex>
                    <v-flex xs9 offset-sm1>
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



        <v-data-table
                :rows-per-page-items="[100,200,500,{'text':'All','value':-1}]"
                :loading="isAjax" fixed
                :headers="headers"
                :search="grid.pagination.search"
                :items="clicksList"  :hide-actions="false"
                :pagination.sync="grid.pagination"
                class="elevation-0 fixed-header"
                slot="body-center">
            <template slot="items" slot-scope="{item}">
                <td>{{ item.campaign_id }}</td>
                <td>{{ item.brand_name }}</td>
                <td>{{ item.status_name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.cb_selection }}</td>
                <td>{{ item.creation_datetime | dmy}}<br> {{ item.creation_datetime  | time }}</td>
                <td>{{ item.start_datetime | dmy}} <br>{{ item.start_datetime  | time }}</td>
                <td>{{ item.end_datetime | dmy}} <br>{{ item.end_datetime  | time }}</td>
                <td>{{ item.lp_name }}</td>
                <td>{{ item.lp_type | lpType}}</td>
                <td :title="getAgesRangesList(item.cb_age_range)" v-html="getAgesRanges(item.cb_age_range)"></td>
                <td>{{ item.cb_activity_level }}</td>
                <td>{{ item.cb_target_quantity }}</td>
                <td>{{ item.cb_target_quantity_processed }}</td>
                <td>{{ item.lead }}</td>
                <td><span v-if="item.processed_cb_quantity">{{ item.lead/item.processed_cb_quantity }}</span></td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                {{$vuetify.t('From')}} {{ pageStart }} {{$vuetify.t('To')}} {{ pageStop }}  {{$vuetify.t('of')}} {{ itemsLength }}
            </template>

        </v-data-table>

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
    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer, DatePicker},
        data () {

            const headers = [
                { text: this.$vuetify.t('ID'), value: 'campaign_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand_name' },
                { text: this.$vuetify.t('Status'), value: 'status_name' },
                { text: this.$vuetify.t('Type'), value: 'type' },
                { text: this.$vuetify.t('CB Selection'), value: 'cb_selection' },
                { text: this.$vuetify.t('Creation DateTime'), value: 'creation_datetime' },
                { text: this.$vuetify.t('Start DateTime'), value: 'start_datetime' },
                { text: this.$vuetify.t('End DateTime'), value: 'end_datetime' },
                { text: this.$vuetify.t('LP Name'), value: 'lp_name' },
                { text: this.$vuetify.t('LP Type'), value: 'lp_type' },
                { text: this.$vuetify.t('Age Range'), value: 'cb_age_range', width: 200 },
                { text: this.$vuetify.t('CB Activity Level'), value: 'cb_activity_level' },
                { text: this.$vuetify.t('Target CB Qty'), value: 'cb_target_quantity' },
                { text: this.$vuetify.t('Processed CB Qty'), value: 'cb_target_quantity_processed' },
                { text: this.$vuetify.t('Leads'), value: 'lead' },
                { text: this.$vuetify.t('Conversion (%)'), value: 'conversion' }
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
            ...mapState('campaigns', {'agesList':'agesList', 'grid': 'grid', 'clicksList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
            ...mapGetters('campaigns', ['agesListById']),
            ...mapState('channels', {'channelList': 'list'}),
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('advformats', {'advformatsList': 'list'}),
            ...mapState('locations', {'locationsList': 'list'}),
            ...mapState('api', {'isAjax': 'isAjax'}),
        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('campaigns', ['resetSearch', 'search']),
            statusIdToText,
            isOdd (num) { return num % 2;},
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
