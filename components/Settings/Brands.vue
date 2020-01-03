<!--eslint-disable-->
<template>
    <GridContainer title="Setting Brands">

        <CardPanel slot="container-top">

        </CardPanel>

        <div slot="header-right" class="pb-2">
            <ButtonNew name="Add Brand"/>
        </div>
        <v-data-table
                :headers="headers"
                :items="list"
                :hide-actions="false"
                class="elevation-0"
                slot="body-center"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{ item.brand_id }}</td>
                <td>{{ item.brand }}</td>
                <td>{{ item.sms_mt_text_message }}</td>
                <td>{{ item.conversion_grace_period }}</td>
                <td width="1" class="pa-0">
                    <GridButton icon="edit" color="green" @click="onClick"></GridButton>
                </td>
                <td width="1" class="pa-0">
                    <GridButton icon="visibility" color="blue" @click="onClick"></GridButton>
                </td>
                <td width="1" class="pa-0">
                    <GridButton icon="delete" color="error" @click="onClick"></GridButton>
                </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                {{$vuetify.t('From')}} {{ pageStart }} {{$vuetify.t('To')}} {{ pageStop }}  {{$vuetify.t('of')}} {{ itemsLength }}
            </template>

        </v-data-table>
    </GridContainer>
</template>
<script>
    import {mapState} from 'vuex'
    import GridButton from '../General/GridButton'
    import GridContainer from '../General/GridContainer'
    import CardPanel from "../General/CardPanel";
    import ButtonNew from "../General/ButtonNew";

    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer},
        data () {
            const headers = [
                { text: this.$vuetify.t('Brand ID'), value: 'brand_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand' },
                { text: this.$vuetify.t('SMS MT Message'), value: 'sms_mt_text_message' },
                { text: this.$vuetify.t('Conversion grace period'), value: 'conversion_grace_period' },
                { text: 'Edit', value: 'action', sortable: false },
                { text: 'View', value: 'action', sortable: false },
                { text: 'Delete', value: 'action', sortable: false }
            ]
            return {
                gridFilter: '',
                headers
            }
        },
        computed: {
            ...mapState('usersBrandsChannels', ['list', '$record'])
        },
        methods: {
            onClick () {
                alert('onClick')
            }
        }
    }
</script>

