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
                <v-flex sm12 xs12>
                    <v-select
                          :items="[5,10,20,30,40,50,60,70,80,90,100,120,140]"
                          v-model="$record.contact_grace_period"
                          label="Contact Grace Period"
                          single-line
                          search-input
                          bottom
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap>

                <v-flex xs6 style="line-height: 0">
                    <span v-if="$record.validity_contact_start_datetime"  class="active-label-size" >Validity Contact Start DateTime</span>
                    <span v-else  class="active-label-size" > &nbsp;</span>

                    <DatePicker
                            @change="onStartChange"
                            value-type="YYYY-MM-DD HH:mm:ss"
                            format="DD/MM/YYYY - HH:mm:ss"
                            :disabled-date="notBeforeToday"
                            :time-picker-options="timePickerOptions"
                            :placeholder="$vuetify.t('Start DateTime')" v-model="$record.start_datetime" type="datetime"></DatePicker>
                </v-flex>

                <v-flex xs6 style="line-height: 0">
                    <span v-if="$record.validity_contact_end_datetime"  class="active-label-size" > Validity Contact End DateTime</span>
                    <span v-else  class="active-label-size" > &nbsp;</span>
                    <DatePicker
                            @change="onEndChange"
                            value-type="YYYY-MM-DD HH:mm:ss"
                            format="DD/MM/YYYY - HH:mm:ss"
                            :disabled-date="notBeforeStartDateTime"
                            :time-picker-options="timePickerOptions"
                            :placeholder="$vuetify.t('End DateTime')" v-model="$record.end_datetime" type="datetime"></DatePicker>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex sm6 xs6>

                    <v-select
                            dense
                            hide-details
                            :label="$vuetify.t('Validity Contact Weekdays')"
                            _items="contactList"
                            multiple deletable-chips chips v-model="$record.validity_contact_weekdays"
                    />
                </v-flex>
                <v-flex sm6 xs6>
                    <v-text-field append-icon="" label="Sky SHA512 Pwd"   hide-details v-model="$record.sky_sha512_pwd" />
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs2 offset-xs5>
                    <v-btn  style="width:100%"  color="primary"  @click="onAdd" :disabled="!isValid">
                        {{$vuetify.t('Save') }}
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
        components: {
            FormPanel, GridButton, DatePicker
        },
        data () {
            return {
                timePickerOptions: timePickerOptions(),
                requiredRule: [v => !!v || 'Required']
            }
        },

        computed: {
          ...mapState('configuration', ['$record']),
          isValid () {
            if(!this.$record.sky_sha512_pwd) return false
            if(!this.$record.validity_contact_weekdays) return false
            if(!this.$record.contact_grace_period) return false
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
          ...mapActions('configuration', ['add', 'save']),

        }
    }
</script>

<style scoped>

</style>
