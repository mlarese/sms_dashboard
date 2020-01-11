import _has from 'lodash/has'

/**
 * ruoli:
 *    admin
 *
 *
 */
const menuItems = {
    campaigns: {to: 'campaigns', label: 'Campaigns'},
    leads: {to: 'leads', label: 'Leads'},
    msisdnsearch: {to: 'msisdnsearch', label: 'MSISDN Search'},
    whitelist: {to: 'whitelist', label: 'Whitelist'},
    landingpages: {to: 'landingPages', label: 'Landing Pages'},
    settings: {to: 'settings/brands', label: 'Settings'}
}


const menus = {
  Admin: [
    menuItems.campaigns,
    menuItems.leads,
    menuItems.msisdnsearch,
    menuItems.whitelist,
    menuItems.landingpages,
    menuItems.settings
  ],
  'Third Party Agency': [
    menuItems.campaigns,
    menuItems.leads
  ],
  guest: [

  ]
}

export const state = () => ({
  locale: 'it',
  title: 'SMS dashboard',
  debugMode: true,
  ui: {currentMenuItem: 0},
  languages: [
    {id: 'it', label: 'ITA'},
    {id: 'en', label: 'ENG'},
    {id: 'de', label: 'DEU'}
  ],
  menus,
  menuItems: [
    {to: 'role', label: 'Roles'},
    {to: 'user', label: 'Users'},
    {to: 'usersrole', label: 'Users Roles'},
    {to: 'usersbrandschannel', label: 'Users Brands Channels'},
    {to: 'landingpage', label: 'Landing Pages'},
    {to: 'brandlandingpage', label: 'Brand Landing Page'},

  ]
})

export const mutations = {
  setLocale (state, payload) {
    state.locale = payload
  },
  setTitle (state, payload) {
    state.title = payload
  },
  setLanguages (state, payload) {
    state.languages = payload
  },
  setMenu (state, payload) {
    state.menu = payload
  }
}

export const actions = {
}

export const getters = {
  role: (s, g, rs) => !_has(rs, 'auth.user.role') ? 'guest' : rs.auth.user.role,
  user: (s, g, rs) => !_has(rs, 'auth.user') ? '' : rs.auth.user,
  userName: (s, g, rs) => !_has(rs, 'auth.user.userName') ? '' : rs.auth.user.userName,
  menuItems: (s, g) => s.menus[g.role]
}
