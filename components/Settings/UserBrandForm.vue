<!--eslint-disable-->
<template>
    <FormPanel v-bind="$attrs" >
        <div slot="header-right">
            <v-btn outline color="indigo"   @click="$router.go(-1)" >
                {{$vuetify.t('Back')}}
            </v-btn>

        </div>

        <v-form
            ref="form"
            lazy-validation
        >

            <v-layout row wrap>
                <v-flex sm6 xs12>
                    <v-text-field append-icon="" label="Company Name" single-line  hide-details v-model="$record.company_name" />
                </v-flex>

                <v-flex sm6 xs12>
                    <v-text-field append-icon="" label="Brand" single-line  hide-details v-model="$record.brand" />
                </v-flex>




            </v-layout>

            <v-layout row wrap>
                <v-flex xs2 offset-xs5>
                    <v-btn  style="width:100%"  color="primary"  @click="onAdd" :disabled="!isValid">
                        {{$vuetify.t('Save') }}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </FormPanel>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import FormPanel from '../General/FormPanel'
    import GridButton from '../General/GridButton'

    export default {
        components: {
            FormPanel, GridButton
        },
        data () {
          return {}
        },
        computed: {
          ...mapState('users', ['$record']),
          ...mapState('roles', {'rolesList': 'list'}),
          isValid () {
            if(!this.$record.brand) return false
            return true
          }
        },
        methods: {
          onAdd () {
            this.save()
              .then(r => this.$router.go(-1))
          },
          ...mapActions('usersBrands', ['add', 'save']),

        }
    }
</script>

<style scoped>

</style>
