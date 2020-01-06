<!--eslint-disable-->
<template>
    <FormPanel v-bind="$attrs">
        <div slot="header-right">
            <!--<v-btn outline color="indigo"   @click="$router.go(-1)" >
                {{$vuetify.t('Back')}}
            </v-btn>-->
            <v-btn class="mx-2" fab dark small color="red" @click="$router.go(-1)" >
                <v-icon dark>keyboard_arrow_left</v-icon>
            </v-btn>
        </div>
        <v-layout row wrap>
            <v-flex xs6>
                <v-combobox dense   hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="$record.brand_id" item-text="brand_name" item-value="brand_id" />
            </v-flex>
            <v-flex xs6>
                <v-combobox dense   hide-details :label="$vuetify.t('Campaign Type')"  :items="['Immediate', 'Scheduled']"   v-model="$record.type" />
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs6 style="line-height: 0">
                    <span v-if="$record.start_datetime"  class="active-label-size" >Start Datetime</span>
                    <span v-else  class="active-label-size" > &nbsp;</span>

                    <DatePicker :placeholder="$vuetify.t('Start Datetime')" v-model="$record.start_datetime" type="DatePicker"></DatePicker>
            </v-flex>

            <v-flex xs6 style="line-height: 0">
                <span v-if="$record.end_datetime"  class="active-label-size" >End Datetime</span>
                <span v-else  class="active-label-size" > &nbsp;</span>
                <DatePicker :placeholder="$vuetify.t('End Datetime')" v-model="$record.end_datetime"></DatePicker>
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
                <v-combobox dense  hide-details :label="$vuetify.t('Age Range')"  :items="['0-18', '18-25', '26-35', '36-45', '46-55']"   v-model="$record.os_only" />
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs6>
                <v-combobox dense  hide-details :label="$vuetify.t('CB Activity Level')"  :items="['All', 'High', 'Medium', 'Low']"   v-model="$record.cb_activity_level" />
            </v-flex>
            <v-flex xs6>
                <v-combobox dense  hide-details :label="$vuetify.t('CB Target Quantity')"   v-model="$record.cb_target_quantity" item-text="text" item-value="value" />
            </v-flex>
        </v-layout>
        <div slot="header-right">
            <v-btn class="mx-2" fab small dark color="primary"  @click="save">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </div>
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
            ...mapActions('campaigns', ['add', 'save'])
        }
    }
</script>

<style scoped>

</style>
