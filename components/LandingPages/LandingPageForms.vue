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
                    <v-select append-icon="" label="Port-Out" hide-details v-model="$record.portout_flag" :items="['Y','N']" />
                </v-flex>
            </v-layout>


            <v-layout row wrap class="mt-2">

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

            <v-toolbar class="mt-2 px-3 elevation-2" dense >
                <v-toolbar-title>
                    Button Element
                </v-toolbar-title>

                <v-spacer/>


                <file-upload
                        input-id="file1"
                        class="btn btn-primary"
                        :post-action="baseURL+'/api/upload/button/'+$record.guid"
                        extensions="gif,jpg,jpeg,png,webp"
                        accept="image/png,image/gif,image/jpeg,image/webp"
                        :multiple="false"
                        :size="1024 * 1024 * 10"
                        ref="upload_button"
                        v-model="files1"
                        @input-file="inputFile"
                        @input-filter="inputFilter"
                >


                        <v-progress-circular size="24"  v-if="$refs.upload_button && $refs.upload_button.active" />
                        <v-icon title="Upload button element" v-else>cloud_upload</v-icon>
                </file-upload>

            </v-toolbar>
            <v-card class="elevation-1 mb-2">
                <v-layout row wrap>
                    <v-flex xs12>
                        <div  class="text-xs-center pa-2" style="border:0px solid silver;min-height: 40px">
                            <img :src="btnImg" style="max-height: 80px"  />
                        </div>

                    </v-flex>
                </v-layout>
            </v-card>


            <v-toolbar class="mt-3 px-3 elevation-2" dense >
                <v-toolbar-title>
                    Banner Element
                </v-toolbar-title>

                <v-spacer/>
                <file-upload
                        input-id="file2"
                        class="btn btn-primary"
                        :post-action="baseURL+'/api/upload/banner/'+$record.guid"
                        extensions="gif,jpg,jpeg,png,webp"
                        accept="image/png,image/gif,image/jpeg,image/webp"
                        :multiple="false"
                        :size="1024 * 1024 * 10"
                        ref="upload_banner"
                        v-model="files2"
                        @input-file="inputFileBanner"
                        @input-filter="inputFilterBanner"
                >

                        <v-progress-circular size="24"  v-if="$refs.upload_banner && $refs.upload_banner.active" />
                        <v-icon title="Upload button element" v-else>cloud_upload</v-icon>


                </file-upload>

            </v-toolbar>
            <v-card class="elevation-1 mb-2">
                <v-layout row wrap>
                    <v-flex xs12>
                        <div  class="text-xs-center pa-2" style="border:0px solid silver;min-height: 40px">
                            <img :src="$record.lp_banner_element || noImageLpPlaceholder" style="max-height: 80px"  />
                        </div>

                    </v-flex>
                </v-layout>
            </v-card>

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
    import {baseURL, uploadUrl,wwwUrl} from '../../storeimp/api/api-properties'
    import {noImageLpPlaceholder} from '../../assets/consts'
    import Vue from 'vue'
    export default {
        name: "CampaignForms",
        components: {
            FormPanel, DatePicker, GridButton,FileUpload
        },
        data () {
          return {
            timePickerOptions: timePickerOptions(),
            requiredRule: [v => !!v || 'Required'],
            baseURL,
            noImageLpPlaceholder,
            files1: [],
            files2: []
          }
        },
        computed: {
          ...mapState('landingPages', ['$record']),
          btnImg () {
            if(this.$record.button_element)
              return this.$record.button_element

            return noImageLpPlaceholder
          },
          bannerImg () {
            if(this.$record.lp_banner_element)
              return this.$record.lp_banner_element

            return noImageLpPlaceholder
          },
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
          inputFile: function (newFile, oldFile) {
            this.$record.button_element = null
            this.$refs.upload_button.active=true
            if (newFile && oldFile && !newFile.active && oldFile.active) {
              const {fn} = newFile.response
              this.$record.button_element = `${wwwUrl}${fn}`
            }
          },
          inputFileBanner: function (newFile, oldFile) {
            Vue.set(this.$record, 'lp_banner_element',noImageLpPlaceholder)
            this.$refs.upload_banner.active=true
            if (newFile && oldFile && !newFile.active && oldFile.active) {
              const {fn} = newFile.response
              Vue.set(this.$record, 'lp_banner_element',`${wwwUrl}${fn}`)
            }
          },

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
          },
          inputFilterBanner: function (newFile, oldFile, prevent) {
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
