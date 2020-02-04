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

            </v-layout>

            <v-layout row wrap  >
                <v-flex sm4>
                    <v-text-field label="Contact Grace Period"   hide-details v-model="$record.contact_grace_period" type="number" />
                </v-flex>

                <v-flex sm4>
                    <v-combobox hide-details dense :items="timesList" :label="$vuetify.t('Validity Contact Period - Start Date Time')" v-model="$record.validity_contact_period_start_datetime" />
                </v-flex>

                <v-flex sm4>
                    <v-select hide-details dense :items="timesList" :label="$vuetify.t('Validity Contact Period - End Date Time')" v-model="$record.validity_contact_period_end_datetime"/>
                </v-flex>



            </v-layout>

            <v-layout row wrap class="mt-1">
                <v-flex sm8>
                    <v-select
                            dense
                            hide-details
                            :label="$vuetify.t('Validity Contact Weekdays')"
                            :items="weekList"
                            multiple deletable-chips chips v-model="$record.validity_contact_weekdays"
                    />
                </v-flex>

                <v-flex sm2>
                    <v-text-field label="Sky SHA512 Pwd"   hide-details v-model="$record.sky_sha512_pwd" />
                </v-flex>

                <v-flex sm2>
                    <v-text-field label="Sms Bulk"   hide-details v-model="$record.sms_bulk" type="number" />
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
    import {mapState, mapActions, mapMutations} from 'vuex'
    import FormPanel from '../General/FormPanel'
    import GridButton from '../General/GridButton'
    import {notifySuccess} from '../../storeimp/api/actions'

    export default {
        components: {
            FormPanel, GridButton
        },
        data () {
            return {}
        },
        computed: {
          ...mapState('configuration', ['$record','timesList', 'weekList']),
          isValid () {
            if(!this.$record.sky_sha512_pwd) return false
            if(!this.$record.validity_contact_weekdays) return false
            if(!this.$record.contact_grace_period) return false
            if(!this.$record.validity_contact_period_start_datetime) return false
            if(!this.$record.validity_contact_period_end_datetime) return false
            if(!this.$record.sms_bulk) return false

            return true
          }
        },
        methods: {
          onAdd () {
            this.save()
              .then(r => {
                  this.notification(notifySuccess({title: 'Configuration Update', text:'Configuration successfully updated'}))
              })
          },
          ...mapActions('configuration', ['add', 'save']),
          ...mapMutations('api', ['notification']),

        }
    }
</script>

<style scoped>

</style>
