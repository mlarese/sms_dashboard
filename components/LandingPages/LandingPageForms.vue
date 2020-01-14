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
                    <v-text-field append-icon="" label="LP Name"   hide-details v-model="$record.lp_name" />
                </v-flex>

                <v-flex xs3>
                    <v-select :items="[{text: 'One-click', value:1},{text: 'Two-click', value:2}]" label="Type" hide-details v-model="$record.lp_type" />
                </v-flex>
                <v-flex xs4>
                    <v-text-field append-icon="" label="Background Color" hide-details v-model="$record.background_rgb" />
                </v-flex>
                <v-flex xs1>
                    <v-select append-icon="" label="Portout" hide-details v-model="$record.portout_flag" :items="['Y','N']" />
                </v-flex>
            </v-layout>


            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field append-icon="" label="Banner"   hide-details v-model="$record.lp_banner_element" />
                </v-flex>

                <v-flex xs2>
                    <v-text-field append-icon="" label="Text Color" hide-details v-model="$record.text_rgb" />
                </v-flex>
                <v-flex xs5>
                    <v-text-field append-icon="" label="Text Welcome" hide-details v-model="$record.text_welcome" />
                </v-flex>
                <v-flex xs5>
                    <v-text-field append-icon="" label="Text Greeting" hide-details v-model="$record.text_greeting" />
                </v-flex>
                <v-flex xs12>
                    <v-text-field append-icon="" label="Button"   hide-details v-model="$record.button_element" />
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
          ...mapState('landingPages', ['$record']),
          isValid () {
            if(!this.$record.lp_name) return false
            if(!this.$record.lp_type) return false
            if(!this.$record.background_rgb) return false
            if(!this.$record.lp_banner_element) return false
            if(!this.$record.text_rgb) return false
            if(!this.$record.text_welcome) return false
            if(!this.$record.text_greeting) return false
            if(!this.$record.button_element) return false
            return true
          }
        },
        methods: {
          onAdd () {
            this.save()
              .then(r => this.$router.go(-1))
          },
          ...mapActions('landingPages', ['add', 'save']),

        }
    }
</script>

<style scoped>

</style>
