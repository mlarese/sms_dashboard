<!--eslint-disable-->
<template>
    <FormPanel v-bind="$attrs">
        <div slot="header-right">
            <v-btn outline color="indigo"   @click="$router.go(-1)" >
                {{$vuetify.t('Back')}}
            </v-btn>
        </div>
        <v-layout row wrap>
            <v-flex xs6>
                <v-combobox dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="$record.brand_id" item-text="brand_name" item-value="brand_id" />
            </v-flex>
            <v-flex xs6>
                <v-combobox dense   hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="$record.campaign_type" />
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs6 style="line-height: 0">
                    <span v-if="$record.start_DatePicker"  class="active-label-size" >Start DatePicker</span>
                    <span v-else  class="active-label-size" > &nbsp;</span>

                    <DatePicker :placeholder="$vuetify.t('Start DatePicker')" v-model="$record.start_DatePicker" type="DatePicker"></DatePicker>
            </v-flex>

            <v-flex xs6 style="line-height: 0">
                <span v-if="$record.end_DatePicker"  class="active-label-size" >End DatePicker</span>
                <span v-else  class="active-label-size" > &nbsp;</span>
                <DatePicker :placeholder="$vuetify.t('End DatePicker')" v-model="$record.end_DatePicker"></DatePicker>
            </v-flex>

            <v-flex xs6 v-if="false">
                <v-combobox dense  hide-details :label="$vuetify.t('CB Selection')"  :items="['Random', 'Sequential']"   v-model="$record.cb_selection" />
            </v-flex>
        </v-layout>


        <v-layout row wrap>
            <v-flex xs6>
                <v-combobox dense  hide-details :label="$vuetify.t('Gender')"  :items="['All', 'M', 'F']"   v-model="$record.gender" />
            </v-flex>
            <v-flex xs6>
                <v-combobox dense  hide-details :label="$vuetify.t('OS')"  :items="['Android', 'iOS', 'Other']"   v-model="$record.os_only" />
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs6>
                <v-combobox dense  hide-details :label="$vuetify.t('CB Activity Level')"  :items="['All', 'High', 'Medium', 'Low']"   v-model="$record.cb_activity_level" />
            </v-flex>
            <v-flex xs6>
                <v-combobox dense  hide-details :label="$vuetify.t('Conversion Status')"  :items="statusList"  v-model="$record.conversion_status_id" item-text="text" item-value="value" />
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs4 offset-xs4>

                <v-btn  style="width:100%" dark color="primary"  @click="add">
                    {{$vuetify.t('Confirm') }}
                </v-btn>
            </v-flex>
        </v-layout>
    </FormPanel>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import FormPanel from '../General/FormPanel'
    import GridButton from '../General/GridButton'
    import DatePicker from 'vue2-datepicker';
    export default {
        name: "CampaignForms",
        components: {
          FormPanel, DatePicker, GridButton
        },
        computed: {
            ...mapState('brands', {'brandsList': 'list'}),
            ...mapState('campaigns',  ['statusList', '$record'])
        },
        methods: {
            ...mapActions('campaigns', ['add'])
        }
    }
</script>

<style scoped>

</style>
