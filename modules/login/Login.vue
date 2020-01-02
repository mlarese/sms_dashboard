<!--eslint-disable-->
<template>
    <v-layout align-center justify-center class="login mt-5" >
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-6 pt-0 px-3 opacity70" style="border-radius: 8px">
                <v-card-text>

                    <div class="text-xs-center mb-4">
                        <img src="c2sms_logo.png" alt="logo c2sms" width="240" class="ml-4">
                    </div>
                    <v-form>
                        <v-text-field  prepend-icon="person" v-model="username" label="Login" type="text"></v-text-field>
                        <v-text-field   prepend-icon="lock" @keyup.enter="login" v-model="password" label="Password" id="password" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>
                    <v-btn  :loading="loading" class="mr-2" :disabled="!canLogin" color="info" @click="login" @keyup.enter="login" small>
                        Login
                        <v-icon right>input</v-icon>
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-flex>
    </v-layout>

</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import {notifyError} from '../../storeimp/api/actions'
  import {getSchema} from '../../assets/helpers'

  export default {
    layout: 'login',
    components: {},
    data () {
      return {
        error: null,
        username: '',
        password: '',
        alert: null,
        unverified: false,
        showReset: false,
        loading: false
      }
    },
    computed: {
      ...mapState('app', ['title']),
      ...mapState('api', ['isAjax']),
      canLogin () {
        if (!this.username) {
          return false
        }
        if (!this.password) {
          return false
        }

        return true
      }
    },
    mounted () {
      // debugger // eslint-disable-line
      // console.log('debug')
    },
    methods: {
      ...mapActions('appauth', ['passwordReset']),
      onResetPassword (user) {
        this.showReset = false
        this.$notify({
          type: 'success',
          text: this.$t('You will receive an email shortly')
        })
        return this.passwordReset(user)
      },
      async login () {
        if (!this.canLogin) {
          return
        }
        this.error = null
        let schema = getSchema()
        this.loading = true
        return this.$auth
          .loginWith(schema, {
            data: {
              username: this.username,
              password: this.password
            }
          })
          .then(() => {
            this.loading = false
            return this.$router.push('/campaigns')
          })
          .catch(e => {
            this.loading = false
            this.error = e + ''
            this.$store.commit('api/notification', notifyError(e, this.$t), {root: true})
          })
      }
    }
  }
</script>
<style lang="scss">
    .opacity70{   background: rgba(46,44,44,.7) !important  }

    .login {
        .icon {
            align-items: center;
            display: inline-flex;
            font-size: 20px !important;
            vertical-align: bottom;
        }


        .input-group--text-field input {
            height: 40px !important ;
        }
    }
</style>
