<!--eslint-disable-->
<template>
    <v-container fluid>

        <v-toolbar dense class="elevation-0 pl-0 mb-3"  color="white" style="font-size:36px !important;border-bottom: 1px solid #dddddd !important">
            <slot name="header-left">
                <v-toolbar-title class="display-5" style="font-size:32px !important;">{{ $vuetify.t(title) }}</v-toolbar-title>
            </slot>

            <v-spacer/>
            <slot name="header-right"></slot>
        </v-toolbar>

        <v-card slot="container-top" class="elevation-0 pa-1" style="background:#f5f5f5;border:1px solid #ddd;border-bottom:0 !important">
            <v-container fluid grid-list-md>
            <slot>

            </slot>
            </v-container>
        </v-card>
    </v-container>
</template>
<script>
  export default {
    name: 'FormPanel',
    props: {
      title: {type: String, default: ''}
    }
  }
</script>
