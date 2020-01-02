<!--eslint-disable-->
<template>
    <GridContainer title="Setting Channels">

        <CardPanel slot="container-top">

        </CardPanel>

        <div slot="header-right" class="pb-2">
            <ButtonNew title="Add Channel" icon="add" color="green"/>
        </div>
        <v-data-table
                :headers="headers"
                :items="list"
                :hide-actions="false"
                class="elevation-0"
                slot="body-center"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{ item.channel_id }}</td>
                <td>{{ item.channel_name }}</td>
                <td>{{ item.channel_currency }}</td>
                <td>{{ item.postback_url }}</td>
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
                { text: this.$vuetify.t('Channel ID'), value: 'channel_id' },
                { text: this.$vuetify.t('Channel Name'), value: 'channel_name' },
                { text: this.$vuetify.t('Channel Currency'), value: 'channel_currency' },
                { text: this.$vuetify.t('Postback URL'), value: 'postback_url' },
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
            ...mapState('channels', ['list', '$record'])
        },
        methods: {
            onClick () {
                alert('onClick')
            }
        }
    }
</script>

