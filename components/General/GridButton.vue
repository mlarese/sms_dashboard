<!--eslint-disable-->
<template>

  <v-btn :disabled="disabled" :dark="dark"  :color="color"  small  class="elevation-0 grid-button mx-0" style="border:1px solid #ddd !important;min-width:0; border-radius: 3px; height:32px; padding:6px 12px;" @click="$emit('click')">
    <v-icon small style="font-size: 18px !important;">{{ icon }}</v-icon>

  </v-btn>
</template>
<script>
  export default {
    props: {
      disabled: {default: false, type:Boolean},
      dark: {default: true, type:Boolean},
      color: {default: 'teal', type:String},
      icon: {default: 'note', type:String}
    }
  }
</script>
