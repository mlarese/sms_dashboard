<!--eslint-disable-->
<template>
    <FormPanel v-bind="$attrs" >


        <v-form
            ref="form"
            lazy-validation
        >
            <v-layout row wrap>
                <v-flex sm3>
                    <v-autocomplete dense hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="$record.brand_id" item-text="brand_name" item-value="brand_id" />
                </v-flex>

                <v-flex sm3>
                    <v-autocomplete dense item-text="lp_name"
                                    item-value="lp_id"  hide-details :label="$vuetify.t('Landing Page')"  :items="landingPageByBrend"   v-model="$record.lp_id" />
                </v-flex>

                <v-flex sm3>
                    <v-combobox dense  hide-details :label="$vuetify.t('CB Activity Level')"  :items="['All', 'High', 'Medium', 'Low']"   v-model="$record.cb_activity_level" />
                </v-flex>

                <v-flex sm3 style="line-height: 0">
                    <div style="position:relative;top:-4px">
                        <span v-if="$record.start_datetime"  class="active-label-size" >Start Datetime</span>
                        <span v-else  class="active-label-size" > &nbsp</span>

                        <DatePicker
                                :disabled="isImmediate"
                                @change="onStartChange"
                                value-type="YYYY-MM-DD HH:mm"
                                format="DD/MM/YYYY - HH:mm"
                                :disabled-date="notBeforeToday"
                                :time-picker-options="timePickerOptions"
                                :placeholder="$vuetify.t('Start Datetime')"
                                v-model="$record.start_datetime" type="datetime"></DatePicker>
                    </div>



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


            <v-layout row wrap class="mt-2 mb-3">
                <v-flex xs2 offset-xs5>

                    <v-btn  style="width:100%"  color="primary"  @click="onEevaluate" :disabled="!isValid">
                        {{$vuetify.t('Evaluate') }}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>

        <div  >
            <v-layout row wrap  class="mb-4">
                <v-flex  offset-xs5 xs2 class="text-xs-center">
                    <span class="title">Addressable Quantity: <b>{{targetQty|number}}</b></span>
                </v-flex>
            </v-layout>


            <v-layout row wrap >

                <v-flex xs12>
                    <v-progress-linear v-if="isAjax" :indeterminate="true"></v-progress-linear>
                </v-flex>
            </v-layout>
        </div>

    </FormPanel>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {timePickerOptions, notBeforeToday} from '../../assets/helpers'
    import FormPanel from '../General/FormPanel'
    import GridButton from '../General/GridButton'
    import DatePicker from 'vue2-datepicker'
    import parseDate from 'date-fns/parse'
    import getDay from 'date-fns/getDay'
    import {timeNoTZ} from '../../assets/filters'
    import {dayMap} from '../../assets/consts'

    export default {
        name: "CampaignForms",
        components: {
            FormPanel, GridButton, DatePicker
        },
        data () {
          return {
            timePickerOptions: timePickerOptions(),
            requiredRule: [v => !!v || 'Required'],
            mode: 'input' // input evaluate
          }
        },
        computed: {
          ...mapState('brands', {'brandsList': 'list'}),
          ...mapState('api', ['isAjax']),
          ...mapState('landingPages', {'lpList': 'list'}),
          ...mapState('campaigns',  ['targetQty', 'statusList', '$record' ,'agesList','cbSelctionsList']),
          ...mapState('locations', {'states':'states','regions':'regions'}),
          ...mapState('configuration', {'configuration':'$record'}),
          landingPageByBrend () {
            if(!this.$record.brand_id) return []
            return  this.lpList.filter(o => o.brand_id === this.$record.brand_id)
          },
          isImmediate () {
            return this.$record.type === 'Immediate'
          },
          isValid () {
            if(!this.$record.brand_id) return false
            if(!this.$record.lp_id) return false
            return true
          },
          isStartDateValid () {
            if(!this.$record.start_datetime) return true

            let stDate =  parseDate(this.$record.start_datetime,'yyyy-MM-dd kk:mm', new Date())
            let stTime = timeNoTZ(this.$record.start_datetime,'HH:mm')


            const day = getDay(stDate)
            const dayName = dayMap[day]

            const idx = this.configuration.validity_contact_weekdays.findIndex(o => o === dayName)

            if(idx===-1)return false

            if(
              stTime>=this.configuration.validity_contact_period_start_datetime &&
              stTime<=this.configuration.validity_contact_period_end_datetime

            ) {
              return true
            }
            return false
          },
          startDateTimeToDate () {
            return new Date(this.$record.start_datetime)
          },
          endDateTimeToDate () {
            return new Date(this.$record.end_datetime)
          },
          evaluateMode () {
            return this.mode === 'evaluate'
          },
          getStartDate_time () {
            if(!this.$record.start_datetime) return ''
            return timeNoTZ(this.$record.start_datetime,'HH:mm')
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
          onEevaluate () {
            this.mode = 'evaluate'

            this.searchQty(this.$record)
          },
          onAdd () {
            this.save()
              .then(r => this.$router.push('/campaigns'))
          },
          ...mapActions('campaigns', ['add', 'save','searchQty']),
          ...mapMutations('campaigns', ['setTargetQty'])

        }
    }
</script>

<style >
    .field-region .v-input__slot {
        padding:10px !important
    }

    .field-region .v-label--active {
        -webkit-transform: translateY(-47px) scale(0.75);
        transform: translateY(-47px) scale(0.75);
    }
</style>
