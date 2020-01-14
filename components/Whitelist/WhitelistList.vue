<!--eslint-disable-->
<template>
    <GridContainer title="Whitelist">
        <div slot="header-right" class="pb-2">
            <ButtonNew title="Add Whitelist" @click.native="onAdd"/>
        </div>
        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap>

                    <v-text-field
                            clearable
                            v-model="gridFilter"
                            label="Msisdn"
                            hide-details
                            append-icon="search"
                    />

                </v-layout>
            </div>



        </CardPanel>



        <v-data-table
                :rows-per-page-items="[100,200,500,{'text':'All','value':-1}]"
                :loading="isAjax" fixed
                :headers="headers"
                :search="gridFilter"
                :items="list"  :hide-actions="false"
                class="elevation-0 fixed-header"
                slot="body-center">
            <template slot="items" slot-scope="{item}">
                <td>{{ item.msisdn }}</td>
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
                { text: this.$vuetify.t('MSISDN'), value: 'msisdn' }
            ]
            return {
              gridFilter: '',
              statusList,
              headers
            }
        },
        computed: {
            ...mapState('whitelist', ['list']),
            ...mapState('api', {'isAjax': 'isAjax'})
        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('whitelist', ['resetSearch', 'search', 'save']),
            onAdd () {
              let a = prompt('Msisdn')
              if(a){
                this.save(a)
              }
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
