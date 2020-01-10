import _has from 'lodash/has'

/**
 * ruoli:
 *    admin
 *
 *
 */
const settingTabs = [
  {to: 'settings/brands', label: 'Brands'},
  {to: 'settings/users', label: 'Users'},
  {to: 'settings/usersbrands', label: 'Users Brands '},
  {to: 'settings/configuration', label: 'Configuration'}
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
