<!--eslint-disable-->
<template>
    <GridContainer title="Brands">

        <div slot="container-top" class="py-4">
            <v-text-field
                v-model="gridFilter"
                label="Search"
                single-line
                hide-details
                append-icon="search"
            />

            <!-- v-autocomplete dense hide-details :label="$vuetify.t('Brand')"  :items="brandsList" v-model="$record.brand_id" item-text="brand_name" item-value="brand_id" /-->

        </div>

        <div slot="header-right" class="pb-2">
            <ButtonNew title="Add Brand" @click.native="onAdd"/>
        </div>
        <v-data-table
                :search="gridFilter"
                :headers="headers"
                :items="list"
                :hide-actions="false"
                class="elevation-0"
                slot="body-center"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{ item.brand_id }}</td>
                <td>{{ item.brand_name }}</td>
                <td>{{ item.sms_mt_text_message }}</td>
                <td>{{ item.conversion_grace_period }}</td>
                <td width="1" class="pa-1">
                    <GridButton icon="edit" color="green" @click="onEdit(item.brand_id )"></GridButton>
                </td>
                <td width="1" class="pa-1">
                    <GridButton icon="delete" color="error" @click="onDelete(item.brand_id)"></GridButton>
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
                { text: this.$vuetify.t('ID'), value: 'brand_id' },
                { text: this.$vuetify.t('Brand'), value: 'brand_name' },
                { text: this.$vuetify.t('SMS MT Message'), value: 'sms_mt_text_message' },
                { text: this.$vuetify.t('Conversion Grace Period'), value: 'conversion_grace_period' },
                { text: 'Edit', value: 'action', sortable: false },
                { text: 'Delete', value: 'action', sortable: false }
            ]
            return {
                gridFilter: '',
                headers
            }
        },
        computed: {
            ...mapState('brands', ['list', '$record'])
        },
        methods: {
            ...mapActions('brands', ['delete', 'load']),
            onDelete (id) {
              if(!confirm('Do you confirm the row deletion ?')) return
              this.delete(id)
                .then(() => {
                  this.load({})
                })
            },
            onAdd () {
                this.$router.push('/settings/brands/add')
            },
            onEdit (id) {
                this.$router.push(`/settings/brands/${id}`)
            }
        }
    }
</script>

