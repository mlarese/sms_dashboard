<!--eslint-disable-->
<template>
    <GridContainer title="Campaigns">
        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap>

                    <v-flex sm3 offset-sm1 xs12>
                        <div class="ml-2">
                        <span v-if="filter.click_date && filter.click_date[0]" class="active-label-size" >Click Date</span>&nbsp;
                        </div>
                        <DatePicker :placeholder="$vuetify.t('Click Date')" v-model="filter.click_date" range></DatePicker>
                    </v-flex>
                    <v-flex sm3 xs12>
                        <div class="ml-2">
                            <span v-if="filter.sms_mo_date && filter.sms_mo_date[0]" class="active-label-size">SMS MO Date</span>&nbsp;
                        </div>
                        <DatePicker :placeholder="$vuetify.t('SMS MO Date')" v-model="filter.sms_mo_date" range></DatePicker>
                    </v-flex>

                    <v-flex sm4 xs3>
                        <div class="ml-2" style="margin-top: 21px !important;"></div>
                        <v-combobox dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />

                    </v-flex>

                </v-layout>
                <v-layout rows wrap class="xs-">
                    <v-flex sm2 offset-sm1 xs3><v-combobox dense    hide-details :label="$vuetify.t('Channel')"  :items="channelList"  v-model="filter.channel_id" item-text="channel_name" item-value="channel_id" /></v-flex>
                    <v-flex sm2 xs4><v-combobox dense  hide-details :label="$vuetify.t('ADV Format')"  :items="advformatsList"  v-model="filter.adv_format_id" item-text="adv_format_name" item-value="adv_format_id" /></v-flex>

                    <v-flex sm2 xs6>
                        <v-combobox dense  :return-object="false" hide-details :label="$vuetify.t('Country')"  :items="[{country: 'ITA'}]" item-text="country" item-value="country" v-model="filter.country" />
                    </v-flex>

                    <v-flex sm3 xs6>
                        <v-text-field dense  hide-details :label="$vuetify.t('Location')"    v-model="filter.region" />
                    </v-flex>

                    <v-flex sm2 xs2 class="text-xs-left pa-0 pt-1">

                        <GridButton icon="search" color="blue" @click="doSearch" />
                        <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />

                    </v-flex>
                </v-layout>
                <v-layout rows wrap>
                    <v-flex sm3 offset-sm1 xs4>
                        <v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('OS')"  :items="['Android', 'iOS', 'Other']"   v-model="filter.os_only" />
                        <v-combobox dense  class="ml-2"  style="width: 30%; min-width:100px;" hide-details :label="$vuetify.t('OS Version')"  :items="[3,4,5,6,7,8,9,10,11,12,13]"  v-model="filter.os_version"  />
                    </v-flex>
                    <v-flex sm3 xs4><v-text-field dense   hide-details :label="$vuetify.t('Msisdn')"  v-model="filter.msisdns"  /></v-flex>
                    <v-flex sm4 xs4>
                        <v-combobox dense  hide-details :label="$vuetify.t('Conversion Status')"  :items="statusList"  v-model="filter.conversion_status_id" item-text="text" item-value="conversion_status_id" />
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
                <td>{{ item.click_date | dmy}} {{ item.click_date  | time }}</td>
                <td>{{ item.brand_name }}</td>
                <td>{{ item.channel_name }}</td>
                <td style="white-space: nowrap">{{ item.adv_format_name }}</td>
                <td style="white-space: nowrap">{{ item.campaign_name }}</td>
                <td>{{ item.bid_price }}</td>
                <td>{{ item.creative_id }}</td>
                <td>
                    <v-tooltip left v-if="item.sms_template_text">
                        <span class="pa-3" slot="activator">{{ item.sms_template_text | truncate(10) }}</span>
                        {{ item.sms_template_text }}
                    </v-tooltip>
                </td>
                <td>{{ item.country }}</td>
                <td>{{ item.region }}</td>
                <td>{{ item.city }}</td>
                <td>{{ item.os_only }} {{ item.os_version }}</td>
                <td>{{ item.user_ip }}</td>
                <td>{{ item.msisdns | truncate(5,'.....')}}</td>
                <td>{{ item.token_id }}</td>
                <td>{{ item.sms_mo_date  | dmy }} {{ item.sms_mo_date  | time }}</td>
                <td>
                    <v-tooltip left v-if="item.sms_mo_final_text ">
                        <span class="pa-3" slot="activator">{{ item.sms_mo_final_text | truncate(8) }}</span>
                        {{ item.sms_mo_final_text }}
                    </v-tooltip>
                </td>
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
                { text: this.$vuetify.t('Click Date'), value: 'click_date' },
                { text: this.$vuetify.t('Brand'), value: 'brand_name' },
                { text: this.$vuetify.t('Channel'), value: 'channel_name' },
                { text: this.$vuetify.t('Adv Format'), value: 'adv_format_name' },
                { text: this.$vuetify.t('Campaign Name'), value: 'campaign_name' },
                { text: this.$vuetify.t('Bid Price'), value: 'bid_price' },
                { text: this.$vuetify.t('Creative Id'), value: 'creative_id' },
                { text: this.$vuetify.t('SMS Template'), value: 'sms_template_text' },
                { text: this.$vuetify.t('Country'), value: 'country' },
                { text: this.$vuetify.t('Region'), value: 'region' },
                { text: this.$vuetify.t('City'), value: 'city' },
                { text: this.$vuetify.t('Os Only'), value: 'os_only' },
                { text: this.$vuetify.t('User Ip'), value: 'user_ip' },
                { text: this.$vuetify.t('Msisdn'), value: 'msisdns' },
                { text: this.$vuetify.t('Token Id'), value: 'token_id' },
                { text: this.$vuetify.t('SMS MO Date'), value: 'sms_mo_date' },
                { text: this.$vuetify.t('SMS MO Text'), value: 'sms_mo_final_text' },
                { text: this.$vuetify.t('Status'), value: 'conversion_status_id' },
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
            ...mapState('clicks', {'grid': 'grid', 'clicksList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
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
            ...mapActions('clicks', ['resetSearch', 'search']),
            statusIdToText,
            doSearch () {
                this.search()
            },
            doResetSearch () {
              this.resetSearch()

            }
        }
    }
</script>
