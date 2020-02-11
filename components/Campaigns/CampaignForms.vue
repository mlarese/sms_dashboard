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
                <v-flex xs4>
                    <v-autocomplete dense hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="$record.brand_id" item-text="brand_name" item-value="brand_id" />
                </v-flex>
                <v-flex xs4>
                    <v-combobox dense   hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="$record.type" />
                </v-flex>
                <v-flex xs4>
                    <v-autocomplete dense item-text="lp_name"
                                    item-value="lp_id"  hide-details :label="$vuetify.t('Landing Page')"  :items="landingPageByBrend"   v-model="$record.lp_id" />
                </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">

                <v-flex xs6 style="line-height: 0">
                        <span v-if="$record.start_datetime"  class="active-label-size" >Start Datetime</span>
                        <span v-else  class="active-label-size" > &nbsp;</span>

                        <DatePicker
                                @change="onStartChange"
                                value-type="YYYY-MM-DD HH:mm:ss"
                                format="DD/MM/YYYY - HH:mm:ss"
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
                            format="DD/MM/YYYY - HH:mm:ss"
                            :disabled-date="notBeforeStartDateTime"
                            :time-picker-options="timePickerOptions"
                            :placeholder="$vuetify.t('End Datetime')" v-model="$record.end_datetime" type="datetime"></DatePicker>
                </v-flex>


            </v-layout>
            <v-layout row wrap class="mt-2">

                <v-flex xs6>
                    <v-combobox dense  hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="$record.cb_gender" />
                </v-flex>
                <v-flex sm12 lg6>

                    <v-select
                            dense
                            hide-details
                            :label="$vuetify.t('Age Range')"
                            :items="agesList"
                            multiple deletable-chips chips v-model="$record.cb_age_range"
                    />
                </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
                <v-flex>
                    <v-combobox multiple dense  small-chips class="hide-dropdown-icon" hide-details :label="$vuetify.t('Postal code')"  chips deletable-chips
                                v-model="$record.postal_code"  />
                </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-3">
                <v-flex>
                    <v-autocomplete class="field-region" full-width multiple :height="70"   small-chips chips deletable-chips  hide-details :label="$vuetify.t('Region')"  :items="regions" v-model="$record.region"  />
                </v-flex>
            </v-layout>

            <v-layout row wrap class="mt-2">

                <v-flex xs4>
                    <v-combobox dense  hide-details :label="$vuetify.t('CB Activity Level')"  :items="['All', 'High', 'Medium', 'Low']"   v-model="$record.cb_activity_level" />
                </v-flex>
                <v-flex xs4>
                    <v-text-field dense  hide-details :label="$vuetify.t('CB Target Quantity')"  v-model="$record.cb_target_quantity" type="number"  />
                </v-flex>

                <v-flex xs4>
                    <v-combobox dense  hide-details :label="$vuetify.t('CB Selection')"  :items="cbSelctionsList"   v-model="$record.cb_selection" />
                </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
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
    import {mapState, mapActions} from 'vuex'
    import {timePickerOptions, notBeforeToday} from '../../assets/helpers'
    import FormPanel from '../General/FormPanel'
    import GridButton from '../General/GridButton'
    import DatePicker from 'vue2-datepicker';

    export default {
        name: "CampaignForms",
        components: {
            FormPanel, DatePicker, GridButton
        },
        data () {
          return {
            timePickerOptions: timePickerOptions(),
            requiredRule: [v => !!v || 'Required']
          }
        },

        computed: {
          ...mapState('brands', {'brandsList': 'list'}),
          ...mapState('landingPages', {'lpList': 'list'}),
          ...mapState('campaigns',  ['statusList', '$record' ,'agesList','cbSelctionsList']),
          ...mapState('locations', {'states':'states','regions':'regions'}),
          landingPageByBrend () {
            if(!this.$record.brand_id) return []
            return  this.lpList.filter(o => o.brand_id === this.$record.brand_id)
          },
          isValid () {
            if(!this.$record.brand_id) return false
            if(!this.$record.start_datetime) return false
            if(!this.$record.type) return false
            if(!this.$record.end_datetime) return false
            if( this.$record.cb_age_range.length===0) return false
            if(!this.$record.type) return false
            if(!this.$record.lp_id) return false
            if(!this.$record.cb_target_quantity) return false
            if(!this.$record.cb_activity_level) return false
            if(!this.$record.cb_selection) return false
            return true
          },
          startDateTimeToDate () {
            return new Date(this.$record.start_datetime)
          },
          endDateTimeToDate () {
            return new Date(this.$record.end_datetime)
          }
        },
        methods: {
          onStartChange () {
            if(this.endDateTimeToDate<=this.startDateTimeToDate)
              this.$record.end_datetime = null
          },
          onEndChange () {
            if(this.endDateTimeToDate<=this.startDateTimeToDate) {
              const oldStart = this.$record.start_datetime
              this.$record.start_datetime = this.$record.end_datetime
              this.$record.end_datetime = oldStart
            }
          },
          notBeforeToday,
          notBeforeStartDateTime (date) {
            return date < this.startDateTimeToDate
          },
          onAdd () {
            this.save()
              .then(r => this.$router.go(-1))
          },
          ...mapActions('campaigns', ['add', 'save']),

        }
    }
</script>

<style >
    .field-region .v-input__slot {
        padding:10px !important;
    }

    .field-region .v-label--active {
        -webkit-transform: translateY(-47px) scale(0.75);
        transform: translateY(-47px) scale(0.75);
    }
</style>
