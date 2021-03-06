import _has from 'lodash/has'

/**
 * ruoli:
 *    admin
 *
 *
 */
const menuItems = {
    statistics: {to: 'statistics/bycampaigns', label: 'Statistics'},
    simulator: {to: 'simulator', label: 'Simulator'},
    campaigns: {to: 'campaigns', label: 'Campaigns'},
    leads: {to: 'leads', label: 'Leads'},
    msisdnsearch: {to: 'msisdnsearch', label: 'MSISDN Search'},
    whitelist: {to: 'whitelist', label: 'Whitelist'},
    landingpages: {to: 'landingPages', label: 'Landing Pages'},
    settings: {to: 'settings/brands', label: 'Settings'},
    cboverview: {to: 'cboverview', label: 'CB Overview'},
    invalids: {to: 'invalids', label: 'Invalid MSISDN'},
    profile: {to: 'profile', label: 'Profile'}
}


const menus = {
  Admin: [
    menuItems.campaigns,
    menuItems.simulator,
    menuItems.statistics,
    //menuItems.leads,
    //menuItems.msisdnsearch,
    menuItems.whitelist,
    menuItems.landingpages,
    //menuItems.cboverview,
    menuItems.settings
  ],
  'Third Party Agency': [
    menuItems.leads,
    menuItems.statistics,
    menuItems.profile
    //,menuItems.msisdnsearch
  ],
  Intermediary:[
    menuItems.campaigns,
    menuItems.statistics,
    menuItems.profile
  ],
  "CB Owner": [
    menuItems.campaigns,
    menuItems.cboverview,
    menuItems.msisdnsearch,
    menuItems.invalids,
    menuItems.profile
  ],
  guest: [

  ]
}

const redirectRoutes = {
  'Admin': '/campaigns',
  'Third Party Agency': '/leads'
}

export const state = () => ({
  locale: 'it',
  title: 'SMS dashboard',
  debugMode: true,
  ui: {currentMenuItem: 0},
  redirectRoutes,
  languages: [
    {id: 'it', label: 'ITA'},
    {id: 'en', label: 'ENG'},
    {id: 'de', label: 'DEU'}
  ],
  menus
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
  isAdmin: (s, g)=> g.role === 'Admin',
  user: (s, g, rs) => !_has(rs, 'auth.user') ? '' : rs.auth.user,
  userName: (s, g, rs) => !_has(rs, 'auth.user.userName') ? '' : rs.auth.user.userName,
  redirectRoute: (s, g) => s.redirectRoutes[g.role],
  menuItems: (s, g) => s.menus[g.role]
}
