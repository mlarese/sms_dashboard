<!--eslint-disable-->
<template>
    <v-card slot="container-top" class="elevation-0 pa-1" style="background:#f5f5f5;border:1px solid #ddd;border-bottom:0 !important">
        <v-container grid-list-md fluid class="test">
        <slot>

        </slot>
        </v-container>
    </v-card>
</template>
<script>
  export default {
    name: 'CardPanel'
  }
</script>
