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
                <v-flex sm2 xs12 v-if="!isAdmin"></v-flex>
                <v-flex sm3 xs12>
                    <v-text-field append-icon="" label="Company Name"   hide-details v-model="$record.company_name" />
                </v-flex>

                <v-flex sm3 xs12>
                    <v-text-field append-icon="" label="User Name"   hide-details v-model="$record.username" />
                </v-flex>



                <v-flex sm3 xs12 v-if="isAdmin">
                    <v-select
                          :items="rolesList"
                          v-model="$record.role_id"
                          label="Role"
                          item-text="role_name"
                          item-value="role_id"

                          search-input
                          bottom
                    ></v-select>
                </v-flex>

                <v-flex sm3 xs12>
                    <v-text-field class="bold" label="Password"   hide-details v-model="$record.password" />
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
    import {mapState, mapActions, mapGetters} from 'vuex'
    import {timePickerOptions, notBeforeToday} from '../../assets/helpers'
    import FormPanel from '../General/FormPanel'
    import GridButton from '../General/GridButton'
    import DatePicker from 'vue2-datepicker';

    export default {
        data () {
          return {}
        },
        components: {
          FormPanel, GridButton
        },
        computed: {
          ...mapState('users', ['$record']),
          ...mapState('roles', {'rolesList': 'list'}),
          ...mapGetters('app', ['isAdmin']),
          isValid () {
            if(!this.$record.username) return false
            if(!this.$record.role_id) return false
            if(!this.$record.company_name) return false
            if(!this.$record.password) return false
            return true
          }
        },
        methods: {
          onAdd () {
            this.save()
              .then(r => this.$router.go(-1))
          },
          ...mapActions('users', ['add', 'save']),

        }
    }
</script>

<style scoped>

</style>
