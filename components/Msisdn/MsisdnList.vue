<!--eslint-disable-->
<template>
    <GridContainer title="Msisdn Search">
        <div slot="header-right">
        </div>
        <CardPanel slot="container-top">
            <div class="">
                <v-layout rows wrap>

                    <v-flex xs5>
                        <v-text-field
                                v-model="filter.msisdn"
                                label="Msisdn"
                                hide-details
                        />
                    </v-flex>

                    <v-flex xs2>
                        <GridButton :dark="true" :disabled="searchDisabled" icon="search" color="blue" @click="doSearch" />
                        <GridButton :dark="false" icon="cancel" color="white" @click="doResetSearch" />
                    </v-flex>


                </v-layout>
            </div>
        </CardPanel>



        <v-data-table
                :loading="isAjax" fixed
                :headers="headers"
                :search="gridFilter"
                :items="list"  :hide-actions="false"
                class="elevation-0 fixed-header"
                hide-actions
                slot="body-center">
            <template slot="items" slot-scope="{item}">
                <td>{{ item.msisdn }}</td>
                <td>{{ item.status_name }}</td>
                <td>{{ item.last_contact_datetime | dmy}} {{ item.last_contact_datetime | time}}</td>
                <td>
                    <v-btn color="black" dark @click="changeStatus(3,item.row_id)" v-if="item.status_id==1" class="elevation-0">Add in Blacklist</v-btn>
                    <v-btn color="info"  @click="changeStatus(2,item.row_id)" v-if="item.status_id==1" class="elevation-0">PortOut</v-btn>
                    <v-btn color="success"  @click="changeStatus(1,item.row_id)" v-if="item.status_id==3" class="elevation-0">Re-Active</v-btn>
                    <v-btn color="success"  @click="changeStatus(1,item.row_id)" v-if="item.status_id==2" class="elevation-0">Port-In</v-btn>
                </td>
            </template>

        </v-data-table>

    </GridContainer>
</template>
<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
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
                { text: this.$vuetify.t('MSISDN'), value: 'msisdn' },
                { text: this.$vuetify.t('Status'), value: 'status_name' },
                { text: this.$vuetify.t('Last Contact Date'), value: 'last_contact_datetime' },
                { text: 'Actions', value: 'action', sortable: false },
            ]
            return {
              gridFilter: '',
              statusList,
              headers
            }
        },
        computed: {
            ...mapState('msisdn', ['list','filter']),
            ...mapState('api', {'isAjax': 'isAjax'}),
            searchDisabled () {
              if (this.filter.msisdn && this.filter.msisdn!=='' && this.filter.msisdn.length>5)
                return false
              else
                return true
            }
        },
        created () {
          this.resetSearch()
        },
        methods: {
            ...mapActions('msisdn', ['resetSearch', 'search','save']),
            ...mapMutations('msisdn', ['setRecord','setEditMode']),
            changeStatus (status_id, row_id) {
              if(!confirm('Do you confirm to proceed?')) return
              let record = {status_id, row_id}
              this.setRecord(record)
              this.save()

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
