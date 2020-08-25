<!--eslint-disable-->
<template>
  <FormPanel v-bind="$attrs" title="Invalid MSISDN">
    <v-toolbar class="mt-3 px-3 elevation-2" dense >
      <v-toolbar-title>
        Upload Invalid MSISDN CSV FILE
      </v-toolbar-title>

      <v-spacer/>
      <file-upload
        input-id="file1"
        :post-action="baseURL+'/api/uploadcsv'"
        extensions="csv"
        accept="itext/csv"
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

  </FormPanel>
</template>
<script>
import FormPanel from '../../components/General/FormPanel'
import {baseURL, uploadUrl,wwwUrl} from '../../storeimp/api/api-properties'
import FileUpload from 'vue-upload-component'

  export default {
    components: {FormPanel, FileUpload},
    data () {
      return {
        baseURL,
        files1: [],
        files2: []
      }
    },
    methods: {
      inputFile: function (newFile, oldFile) {
        this.$refs.upload_button.active=true
        if (newFile && oldFile && !newFile.active && oldFile.active) {
          let {response} = newFile
          alert(`Status Invalid updated for ${response.totalUpdated} MSISDNs`)
        }
      },

      inputFilter: function (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // Filter non-image file
          if (!/\.(csv)$/i.test(newFile.name)) {
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
    },
    fetch ({store}) {
    }
  }
</script>
