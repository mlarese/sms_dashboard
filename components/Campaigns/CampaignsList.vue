<!--eslint-disable-->
<template>
    <GridContainer title="Campaigns">
        <div slot="header-right">
            <ButtonNew title="New Campaign" @click.native="addCampaign" />
        </div>
        <CardPanel slot_="container-top">
            <div class="">
                <v-layout rows wrap>

                    <v-flex sm3 offset-sm1 xs12>
                        <div class="ml-2">
                        <span v-if="filter.creation_datetime && filter.creation_datetime[0]" class="active-label-size" >Creation Datetime</span>&nbsp;
                        </div>
                        <DatePicker :placeholder="$vuetify.t('creation datetime')" v-model="filter.creation_datetime" range></DatePicker>
                    </v-flex>
                    <v-flex sm3 xs12>
                        <div class="ml-2">
                            <span v-if="filter.start_datetime && filter.start_datetime[0]" class="active-label-size">Start Datetime</span>&nbsp;
                        </div>
                        <DatePicker :placeholder="$vuetify.t('Start Datetime')" v-model="filter.start_datetime" range></DatePicker>
                    </v-flex>

                    <v-flex sm4 xs3>
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        <v-combobox dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />

                    </v-flex>

                </v-layout>
                <v-layout rows wrap>
                    <v-flex sm2 offset-sm1 xs3><v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="filter.campaign_type" /></v-flex>
                    <v-flex sm2 xs4><v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('CB Selection')"  :items="['Random', 'Sequential']"   v-model="filter.cb_selection" /></v-flex>
                    <v-flex sm2 xs3><v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('Landing Page Type')"  :items="['One Click', 'No Click']"   v-model="filter.landing_page_type" /></v-flex>
                    <v-flex sm2 xs3><v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="filter.gender" /></v-flex>

                    <v-flex sm2 xs2 class="text-xs-left pa-0 pt-1">
                        <GridButton icon="search" color="blue" @click="doSearch" />
                        <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />
                    </v-flex>
                </v-layout>
                <v-layout rows wrap>
                    <v-flex sm3 xs3><v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('OS')"  :items="['Android', 'iOS', 'Other']"   v-model="filter.os_only" /></v-flex>
                    <v-flex sm3 xs4><v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('CB Activity Level')"  :items="['All', 'High', 'Medium', 'Low']"   v-model="filter.cb_activity_level" /></v-flex>
                    <v-flex sm3 xs3><v-combobox dense  hide-details :label="$vuetify.t('Conversion Status')"  :items="statusList"  v-model="filter.conversion_status_id" item-text="text" item-value="conversion_status_id" />
                    </v-flex>
                </v-layout>
            </div>
        </CardPanel>

        <!-- v-card class="text-xs-right elevation-0 mb-2" slot="body-top" v-if="grid.pagination.pages > 1">
            <v-pagination
                    v-model="grid.pagination.page"
                    :length="grid.pagination.pages"
                    class="elevation-0"

            ></v-pagination>
        </v-card>

        <v-card class="text-xs-right elevation-0 mt-2" slot="body-bottom" v-if="grid.pagination.pages > 1">

            <v-pagination
                    v-model="grid.pagination.page"
                    :length="grid.pagination.pages"
                    class="elevation-0"

            ></v-pagination
        </v-card>-->

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
                <!--<td>{{ item.click_date | dmy}} {{ item.click_date  | time }}</td>-->
                <td>{{ item.campaign_id }}</td>
                <td>{{ item.brand }}</td>
                <!--<td style="white-space: nowrap">{{ item.adv_format_name }}</td>-->
                <td>{{ item.status }}</td>
                <td>{{ item.type }}</td>
                <!--<td>
                    <v-tooltip left v-if="item.sms_template_text">
                        <span class="pa-3" slot="activator">{{ item.sms_template_text | truncate(10) }}</span>
                        {{ item.sms_template_text }}
                    </v-tooltip>
                </td>-->
                <td>{{ item.cb_selection }}</td>
                <td>{{ item.creation_datetime | dmy}} {{ item.creation_datetime  | time }}</td>
                <td>{{ item.start_datetime | dmy}} {{ item.start_datetime  | time }}</td>
                <td>{{ item.end_datetime | dmy}} {{ item.end_datetime  | time }}</td>                <td>{{ item.user_ip }}</td>
                <td>{{ item.token_landing_page_name }}</td>
                <td>{{ item.token_landing_page_type }}</td>
                <td>{{ item.age_range }}</td>
                <td>{{ item.cb_activity_level }}</td>
                <td>{{ item.target_cb_quantity }}</td>
                <td>{{ item.processed_cb_quantity }}</td>
                <td>{{ item.lead }}</td>
                <!--<td>
                    <v-tooltip left v-if="item.sms_mo_final_text ">
                        <span class="pa-3" slot="activator">{{ item.sms_mo_final_text | truncate(8) }}</span>
                        {{ item.sms_mo_final_text }}
                    </v-tooltip>
                </td>-->
                <td>
                    <v-tooltip left>
                        <span class="pa-3" slot="activator">{{ item.conversion_status_id }}</span>
                        {{statusIdToText(item.conversion_status_id)}}
                    </v-tooltip>
                </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                {{$vuetify.t('From')}} {{ pageStart }} {{$vuetify.t('To')}} {{ pageStop }}  {{$vuetify.t('of')}} {{ itemsLength }}
            </template>

        </v-data-table>

    </GridContainer>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
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
                { text: this.$vuetify.t('Campaign ID'), value: 'campaign_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand' },
                { text: this.$vuetify.t('Status'), value: 'status' },
                { text: this.$vuetify.t('Campaign Type'), value: 'type' },
                { text: this.$vuetify.t('CB Selection'), value: 'cb_selection' },
                { text: this.$vuetify.t('Creation Datetime'), value: 'creation_datetime' },
                { text: this.$vuetify.t('Start Datetime'), value: 'start_datetime' },
                { text: this.$vuetify.t('End Datetime'), value: 'end_datetime' },
                { text: this.$vuetify.t('Landing Page Name'), value: 'landing_page_name' },
                { text: this.$vuetify.t('Landing Page Type'), value: 'landing_page_type' },
                { text: this.$vuetify.t('Age Range'), value: 'age_range' },
                { text: this.$vuetify.t('CB Activity Level'), value: 'cb_activity_level' },
                { text: this.$vuetify.t('Target CB Quantity'), value: 'target_cb_quantity' },
                { text: this.$vuetify.t('Processed CB Quantity'), value: 'processed_cb_quantity' },
                { text: this.$vuetify.t('Leads'), value: 'lead' },
                { text: this.$vuetify.t('Conversion'), value: 'conversion' }
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
            ...mapState('campaigns', {'grid': 'grid', 'clicksList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
            ...mapState('channels', {'channelList': 'list'}),
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('advformats', {'advformatsList': 'list'}),
            ...mapState('locations', {'locationsList': 'list'}),
            ...mapState('api', {'isAjax': 'isAjax'})
        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('campaigns', ['resetSearch', 'search']),
            statusIdToText,
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
