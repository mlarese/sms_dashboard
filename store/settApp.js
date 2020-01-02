import _has from 'lodash/has'

/**
 * ruoli:
 *    admin
 *
 *
 */
const settingTabs = [
  {to: 'settings/brands', label: 'Brands'},
  {to: 'settings/channels', label: 'Channels'},
  {to: 'settings/users', label: 'Users'},
  {to: 'settings/userbrandchannels', label: 'Users Brands Channels'},
  {to: 'settings/smsmotemplates', label: 'SMS MO Templates'},
  {to: 'settings/brandchannelcpa', label: 'Brand Channel CPA'},
  {to: 'settings/badwords', label: 'Bad Words'}
]

export const state = () => ({
    ui: {currentTab: 0},
    settingTabs
})

export const mutations = {
}

export const actions = {
}

export const getters = {
}
