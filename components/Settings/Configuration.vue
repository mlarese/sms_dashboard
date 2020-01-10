<!--eslint-disable-->
<template>
    <FormPanel v-bind="$attrs" >
        <div slot="header-right">
            <v-btn outline color="indigo"   @click="$router.go(-1)" >
                {{$vuetify.t('Back')}}
            </v-btn>

        </div>

        <v-form
                ref="form"
                lazy-validation
        >
            <v-layout row wrap>
                <v-flex xs6>

                    <v-autocomplete dense hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="$record.brand_id" item-text="brand_name" item-value="brand_id" />
                </v-flex>
                <v-flex xs6>
                    <v-combobox dense   hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="$record.type" />
                </v-flex>
            </v-layout>
            <v-layout row wrap>

                <v-flex xs6 style="line-height: 0">
                    <span v-if="$record.start_datetime"  class="active-label-size" >Start Datetime</span>
                    <span v-else  class="active-label-size" > &nbsp;</span>

                    <DatePicker
                            @change="onStartChange"
                            value-type="YYYY-MM-DD HH:mm:ss"
                            format="YYYY-MM-DD HH:mm:ss"
                            :disabled-date="notBeforeToday"
                            :time-picker-options="timePickerOptions"
                            :placeholder="$vuetify.t('Start Datetime')" v-model="$record.start_datetime" type="datetime"></DatePicker>
                </v-flex>

                <v-flex xs6 style="line-height: 0">
                    <span v-if="$record.end_datetime"  class="active-label-size" >End Datetime</span>
                    <span v-else  class="active-label-size" > &nbsp;</span>
                    <DatePicker
                            @change="onEndChange"
                            value-type="YYYY-MM-DD HH:mm:ss"
                            format="YYYY-MM-DD HH:mm:ss"
                            :disabled-date="notBeforeStartDateTime"
                            :time-picker-options="timePickerOptions"
                            :placeholder="$vuetify.t('End Datetime')" v-model="$record.end_datetime" type="datetime"></DatePicker>
                </v-flex>


            </v-layout>
            <v-layout row wrap>

                <v-flex xs6>
                    <v-combobox dense  hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="$record.cb_gender" />
                </v-flex>
                <v-flex sm12 lg6>

                    <v-select
                            dense
                            hide-details
                            :label="$vuetify.t('Age Range')"
                            :items="agesList"
                            multiple deletable-chips chips v-model="$record.cb_age_range" />
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-combobox dense  hide-details :label="$vuetify.t('CB Activity Level')"  :items="['All', 'High', 'Medium', 'Low']"   v-model="$record.cb_activity_level" />
                </v-flex>
                <v-flex xs4>
                    <v-combobox dense  hide-details :label="$vuetify.t('CB Target Quantity')"  :items="[100,1000,5000,10000,50000,100000,400000]" v-model="$record.cb_target_quantity"  />
                </v-flex>

                <v-flex xs4>
                    <v-combobox dense  hide-details :label="$vuetify.t('CB Selection')"  :items="['Random', 'Sequential']"   v-model="$record.cb_selection" />
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs2 offset-xs5>

                    <v-btn  style="width:100%"  color="primary"  @click="onAdd" :disabled="!isValid">
                        <v-icon>add</v-icon>
                        {{$vuetify.t('Add') }}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </FormPanel>
</template>
<script>
    import {mapState} from 'vuex'
    import GridButton from '../General/GridButton'
    import GridContainer from '../General/GridContainer'
    import CardPanel from "../General/CardPanel";
    import ButtonNew from "../General/ButtonNew";
    import FormPanel from '../General/FormPanel'


    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer, FormPanel},
        data () {
            const headers = [
                { text: this.$vuetify.t('Channel ID'), value: 'channel_id' },
                { text: this.$vuetify.t('Channel Name'), value: 'channel_name' },
                { text: this.$vuetify.t('Channel Currency'), value: 'channel_currency' },
                { text: this.$vuetify.t('Postback URL'), value: 'postback_url' },
                { text: 'Edit', value: 'action', sortable: false },
                { text: 'View', value: 'action', sortable: false },
                { text: 'Delete', value: 'action', sortable: false }
            ]
            return {
                gridFilter: '',
                headers
            }
        },
        computed: {
            ...mapState('channels', ['list', '$record'])
        },
        methods: {
            onClick () {
                alert('onClick')
            }
        }
    }
</script>

