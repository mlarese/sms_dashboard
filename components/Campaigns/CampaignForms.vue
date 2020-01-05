<!--eslint-disable-->
<template>
    <v-container fluid>
        <v-row>
            <v-col cols="6">
                <v-combobox dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="filter.brand_id" item-text="brand_name" item-value="brand_id" />
            </v-col>
            <v-col cols="6">
                <v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="filter.campaign_type" />            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <span v-if="filter.start_datetime" class="active-label-size">Start Datetime</span>&nbsp;            </v-col>
            <v-col cols="6">
                <v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('CB Selection')"  :items="['Random', 'Sequential']"   v-model="filter.cb_selection" />            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="filter.gender" />
            </v-col>
            <v-col cols="6">
                <v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('OS')"  :items="['Android', 'iOS', 'Other']"   v-model="filter.os_only" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-combobox dense  class="" style="width: 60%;float:left" hide-details :label="$vuetify.t('CB Activity Level')"  :items="['All', 'High', 'Medium', 'Low']"   v-model="filter.cb_activity_level" />
            </v-col>
            <v-col cols="6">
                <v-combobox dense  hide-details :label="$vuetify.t('Conversion Status')"  :items="statusList"  v-model="filter.conversion_status_id" item-text="text" item-value="conversion_status_id" />
            </v-col>
        </v-row>
        <v-spacer></v-spacer><v-btn class="mx-2" fab small dark color="primary"  @click="add">
        <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </v-container>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: "CampaignForms",
        computed: {
            ...mapState('clicks', {'grid': 'grid', 'clicksList': 'list', 'filter': 'filter', 'searchActive': 'searchActive'}),
    },
        methods: {
            ...mapActions('clicks', ['record', "$record", "add"])
        }
    }
</script>

<style scoped>

</style>
