<!--eslint-disable-->
<template>
    <GridContainer title="Landing Pages">
        <div slot="header-right">
            <ButtonNew title="New Landing Page" @click.native="addLandingPage" />
        </div>

        <CardPanel slot="container-top">
            <div class="pa-0">
                <v-layout rows wrap>
                    <v-flex xs4>
                        <v-autocomplete dense  hide-details :label="$vuetify.t('Brands')"
                                        :items="brandsList"
                                        item-text="brand_name"
                                        item-value="brand_id"
                                        clearable
                                        v-model="brandFilter" />
                    </v-flex>
                </v-layout>
            </div>
        </CardPanel>

        <v-data-table
                :rows-per-page-items="[100,200,500,{'text':'All','value':-1}]"
                :loading="isAjax" fixed
                :headers="headers"

                :search="brandFilter"
                :items="lpList"  :hide-actions="false"
                :pagination.sync="grid.pagination"
                class="elevation-0 fixed-header"
                slot="body-center">
            <template slot="items" slot-scope="{item}">
                <td>{{ item.lp_id }}</td>
                <td>{{ item.brand_name }}</td>
                <td>{{ item.lp_name }}</td>
                <td>{{ item.lp_type |lpType}}</td>
                <td>{{ item.background_rgb }}</td>
                <td>{{ item.text_rgb }}</td>
                <td :title="item.text_welcome">{{ item.text_welcome|truncate(20) }}</td>
                <td :title="item.text_post_welcome">{{ item.text_post_welcome|truncate(20) }}</td>
                <td :title="item.text_greeting">{{ item.text_greeting |truncate(20)}}</td>
                <td width="1" class="pa-1">
                    <GridButton icon="edit" color="green" @click="onEdit(item.lp_id )"></GridButton>
                </td>
                <td width="1" class="pa-1">
                    <GridButton icon="delete" color="error" @click="onDelete(item.lp_id)"></GridButton>
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
                { text: this.$vuetify.t('ID'), value: 'lp_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand_name' },
                { text: this.$vuetify.t('LP Name'), value: 'lp_name' },
                { text: this.$vuetify.t('Type'), value: 'lp_type' },
                { text: this.$vuetify.t('Background Color'), value: 'background_rgb' },

                { text: this.$vuetify.t('Text Color'), value: 'text_rgb' },
                { text: this.$vuetify.t('Text Welcome Pre-Button'), value: 'text_welcome' },
                { text: this.$vuetify.t('Text Welcome Post-Button'), value: 'text_post_welcome' },
                { text: this.$vuetify.t('Text Greeting'), value: 'text_greeting' },

                { text: 'Edit', value: 'action', sortable: false },
                { text: 'Delete', value: 'action', sortable: false }
            ]
            return {
                sms_mo_date: null,
                click_date: null,
                gridFilter: '',
                brandFilter: '',
                statusList,
                headers
            }
        },
        computed: {
            ...mapState('landingPages', {'grid': 'grid', 'lpList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('api', {'isAjax': 'isAjax'}),
            listByBrand () {
              if(!this.brandFilter)
                return this.lpList
              else
                return this.lpList.filter(o => o.brand_id === this.brandFilter)
            }
        },
        created () {

        },
        methods: {
            doSearch () {},
            doResetSearch () {},
            ...mapActions('landingPages', [ 'search','delete','load','resetSearch']),
            addLandingPage () {
              this.$router.push('/landingpages/add')
            },
          onDelete (id) {
            if(!confirm('Do you confirm the row deletion ?')) return
            this.delete(id)
              .then(() => {
                this.load({})
              })
          },
          onEdit (id) {
            this.$router.push(`/landingpages/${id}`)
          }
        }
    }
</script>
