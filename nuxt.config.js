const pkg = require('./package')
let routerBase = '/'
if (process.env.NODE_ENV === 'production') {
    routerBase = '/campaigns/'
}
module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
    auth: {
        redirect: {
            logout: '/login',
            callback: '/callback'
        },
        resetOnError: true,
        strategies: {
            dev: {
                _scheme: 'local',
                endpoints: {
                    login: { baseURL: 'http://localhost', url: '/api/auth/login', method: 'post', propertyName: 'token' },
                    logout: {baseURL: 'http://localhost', url: '/api/auth/logout', method: 'post' },
                    user: {baseURL: 'http://localhost', url: '/api/auth/user', method: 'get', propertyName: 'user' }
                },
                tokenRequired: true,
                tokenType: 'bearer'
            },
            devip: {
                _scheme: 'local',
                endpoints: {
                    login: { baseURL: 'http://192.168.1.86', url: '/api/auth/login', method: 'post', propertyName: 'token' },
                    logout: {baseURL: 'http://192.168.1.86', url: '/api/auth/logout', method: 'post' },
                    user: {baseURL: 'http://192.168.1.86', url: '/api/auth/user', method: 'get', propertyName: 'user' }
                },
                tokenRequired: true,
                tokenType: 'bearer'
            },
            prod: {
                _scheme: 'local',
                endpoints: {
                    login: { baseURL: 'http://138.197.11.140/public/index.php', url: '/auth/login', method: 'post', propertyName: 'token' },
                    logout: {baseURL: 'http://138.197.11.140/public/index.php', url: '/auth/logout', method: 'post' },
                    user: {baseURL: 'http://138.197.11.140/public/index.php', url: '/auth/user', method: 'get', propertyName: 'user' }
                },
                tokenRequired: true,
                tokenType: 'bearer'
            },
            local: {
                endpoints: {
                    login: { baseURL: 'http://localhost', url: '/api/auth/login', method: 'post', propertyName: 'token' },
                    logout: {baseURL: 'http://localhost', url: '/api/auth/logout', method: 'post' },
                    user: {baseURL: 'http://localhost', url: '/api/auth/user', method: 'get', propertyName: 'user' }
                },
                tokenRequired: true,
                tokenType: 'bearer'
            }
        }
    },
    router: {
        mode: 'hash',
        base: routerBase,
        middleware: ['acl', 'auth']
    },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
