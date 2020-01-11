<!--eslint-disable-->
<template>
    <GridContainer title="Landing Pages">
        <div slot="header-right">
            <ButtonNew title="New Landing Page" @click.native="addLandingPage" />
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
                <td>{{ item.landing_page_id }}</td>
                <td>{{ item.Landing_page_name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.background_color }}</td>
                <td>{{ item.banner }}</td>
                <td>{{ item.text_color }}</td>
                <td>{{ item.text_welcome }}</td>
                <td>{{ item.text_greeting }}</td>
                <td>{{ item.button }}</td>
                <!--<td>
                    <v-tooltip left v-if="item.sms_mo_final_text ">
                        <span class="pa-3" slot="activator">{{ item.sms_mo_final_text | truncate(8) }}</span>
                        {{ item.sms_mo_final_text }}
                    </v-tooltip>
                </td>-->
                <!--td>
                    <v-tooltip left>
                        <span class="pa-3" slot="activator">{{ item.conversion_status_id }}</span>
                        {{statusIdToText(item.conversion_status_id)}}
                    </v-tooltip>
                </td-->
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
                { text: this.$vuetify.t('Landing Page ID'), value: 'landing_page_id' },
                { text: this.$vuetify.t('Landing Page Name'), value: 'landing_page_name' },
                { text: this.$vuetify.t('Type'), value: 'type' },
                { text: this.$vuetify.t('Background Color'), value: 'background_color' },
                { text: this.$vuetify.t('Banner'), value: 'banner' },
                { text: this.$vuetify.t('Text Color'), value: 'text_color' },
                { text: this.$vuetify.t('Text Welcome'), value: 'text_welcome' },
                { text: this.$vuetify.t('Text Greeting'), value: 'text_greeting' },
                { text: this.$vuetify.t('Button'), value: 'button' }
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
            ...mapState('landingPages', {'grid': 'grid', 'clicksList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
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
            ...mapActions('landingPages', ['resetSearch', 'search']),
            statusIdToText,
            doSearch () {
                this.search()
            },
            doResetSearch () {
              this.resetSearch()

            },
            addLandingPage () {
              this.$router.push('/landingpages/add')
            }
        }
    }
</script>
