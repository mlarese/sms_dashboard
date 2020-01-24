<!--eslint-disable-->
<template>
    <GridContainer title="Users Brands">

        <div slot="container-top" class="py-4">
            <v-layout row>
                <v-flex>
                    <v-text-field
                            v-model="gridFilter"
                            label="Search"

                            hide-details
                            append-icon="search"/>
                </v-flex>
            </v-layout>

            <!-- v-autocomplete dense hide-details :label="$vuetify.t('Brand')"  :items="usersList" v-model="$record.user_id" item-text="brand_name" item-value="user_id" /-->

        </div>

        <div slot="header-right" class="pb-2">
            <ButtonNew title="Add User Brand" @click.native="onAdd"/>
        </div>
        <v-data-table
                :search="gridFilter"
                :headers="headers"
                :items="list"
                :hide-actions="false"
                class="elevation-0"
                :rows-per-page-items="[20,50,{'text':'All','value':-1}]"
                slot="body-center"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{ item.company_name }}</td>
                <td>{{ item.brand_name }}</td>
                <td width="1" class="pa-1" v-if="false">
                    <GridButton icon="edit" color="green" @click="onEdit(item.user_id, item.brand_id  )"></GridButton>
                </td>
                <td width="1" class="pa-1">
                    <GridButton icon="delete" color="error" @click="onDelete(item.user_id, item.brand_id )"></GridButton>
                </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                {{$vuetify.t('From')}} {{ pageStart }} {{$vuetify.t('To')}} {{ pageStop }}  {{$vuetify.t('of')}} {{ itemsLength }}
            </template>

        </v-data-table>
    </GridContainer>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import GridButton from '../General/GridButton'
    import GridContainer from '../General/GridContainer'
    import CardPanel from "../General/CardPanel";
    import ButtonNew from "../General/ButtonNew";

    export default {
        components: {ButtonNew, CardPanel, GridButton, GridContainer},
        data () {
            const headers = [
                { text: this.$vuetify.t('Company Name'), value: 'company_name' },
                { text: this.$vuetify.t('Brand'), value: 'brand_name' },

                // { text: 'Edit', value: 'action', sortable: false },
                { text: 'Delete', value: 'action', sortable: false }
            ]
            return {
                gridFilter: '',
                headers
            }
        },
        computed: {
            ...mapState('usersBrands', ['list', '$record'])
        },
        methods: {
            ...mapActions('usersBrands', ['delete', 'load']),
            onDelete (userId, brandId) {
                if(!confirm('Do you confirm the row deletion ?')) return
                this.delete({userId, brandId})
                    .then(() => {
                        this.load({})
                    })
            },
            onAdd () {
                this.$router.push('/settings/usersbrands/add')
            },
            onEdit (userId, brandId) {
                this.$router.push(`/settings/usersbrands/${userId}_${brandId}`)
            }
        }
    }
</script>

