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
                    <v-select :items="[{text: 'One click', value:1},{text: 'Two click', value:2}]" label="Type" hide-details v-model="$record.lp_type" />
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
            </v-layout>

            <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field append-icon="" label="Button"   hide-details v-model="$record.button_element" />
                    </v-flex>
                    <v-flex xs2 class="pt-2">
                            <file-upload active="true"
                                ref="upload"
                                v-model="files1"
                                post-action="http://138.197.11.140/public/index.php/api/updlpbutton"
                                put-action="/put.method"
                                @input-file="inputFile"
                                @input-filter="inputFilter"
                        >
                            <v-icon>cloud_upload</v-icon>
                        </file-upload>
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
    import FileUpload from 'vue-upload-component'
    export default {
        name: "CampaignForms",
        components: {
            FormPanel, DatePicker, GridButton,FileUpload
        },
          watch:{
            files1:{
              handler() {alert(1)},
              deep:true
            },
            files2(){}
          },
        data () {
          return {
            timePickerOptions: timePickerOptions(),
            requiredRule: [v => !!v || 'Required'],
            files1: [],
            files2: []
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
          /**
           * Has changed
           * @param  Object|undefined   newFile   Read only
           * @param  Object|undefined   oldFile   Read only
           * @return undefined
           */
          inputFile: function (newFile, oldFile) {
            console.log('start',newFile)
            this.$refs.upload.active
            if (newFile && oldFile && !newFile.active && oldFile.active) {
              // Get response data
              console.log('response', newFile.response)
              if (newFile.xhr) {
                //  Get the response status code
                console.log('status', newFile.xhr.status)
              }
            }
          },
          /**
           * Pretreatment
           * @param  Object|undefined   newFile   Read and write
           * @param  Object|undefined   oldFile   Read only
           * @param  Function           prevent   Prevent changing
           * @return undefined
           */
          inputFilter: function (newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
              // Filter non-image file
              if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                return prevent()
              }
            }

            // Create a blob field
            newFile.blob = ''
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
              newFile.blob = URL.createObjectURL(newFile.file)
            }
          }
        }


    }
</script>

<style scoped>

</style>
