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
                <v-flex sm3 xs12>
                    <v-text-field label="Brand" hide-details v-model="$record.brand_name" />
                </v-flex>
                <v-flex sm3 xs12>
                    <v-text-field label="Sender" hide-details v-model="$record.sender" />
                </v-flex>
                <v-flex sm4 xs12>
                    <v-text-field append-icon="" label="Sms Text Message"  hide-details v-model="$record.sms_mt_text_message" />
                </v-flex>

                <v-flex sm2 xs12>
                    <v-text-field append-icon="" label="Conversion Grace Period"  hide-details v-model="$record.conversion_grace_period" />
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
        data () {
          return {}
        },
        components: {
          FormPanel, GridButton
        },
        computed: {
          ...mapState('brands', ['$record']),
          isValid () {
            if(!this.$record.brand_name) return false
            if(!this.$record.sms_mt_text_message) return false
            if(!this.$record.conversion_grace_period) return false
            return true
          }
        },
        methods: {
          onAdd () {
            this.save()
              .then(r => this.$router.go(-1))
          },
          ...mapActions('brands', ['add', 'save']),

        }
    }
</script>

<style scoped>

</style>
