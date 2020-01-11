<!--eslint-disable-->
<template>
    <div class="grid-container ma-2">

        <v-toolbar dense class="elevation-0 pl-0 mb-3"  color="white" style="font-size:36px !important;border-bottom: 1px solid #dddddd !important">
            <slot name="header-left">
                <v-toolbar-title class="display-5" style="font-size:32px !important;">{{ $vuetify.t(title) }}</v-toolbar-title>
            </slot>

            <v-spacer/>
            <slot name="header-right"></slot>
        </v-toolbar>


        <slot name="container-top"></slot>

        <v-card class="elevation-0 pa-3"  style="border:1px solid #dddddd">

            <slot name="body-top"></slot>
            <slot name="body-center"></slot>
            <slot name="body-bottom"></slot>

        </v-card>
    </div>

</template>

<script>
    export default {
        components: {},
        props: {
            title: {default: 'title', type: String}
        }
    }
</script>
