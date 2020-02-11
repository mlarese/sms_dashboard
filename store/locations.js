import _cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

const regions =  [
  'Abruzzo',
  'Basilicata',
  'Calabria',
  'Campania',
  'Emilia Romagna',
  'Friuli Venezia Giulia',
  'Lazio',
  'Liguria',
  'Lombardia',
  'Marche',
  'Molise',
  'Piemonte',
  'Puglia',
  'Sardegna',
  'Sicilia',
  'Toscana',
  'Trentino',
  'Umbria',
  'Valle d\'Aosta',
  'Veneto'
]

export const allRegions = () => {
  let ret = []
  for (let i = 0; i < regions.length; i++) {
    ret.push(regions[i])
  }
  return ret
}

let today = new Date()
export const state = () => {
    return {
      states:  [
        { "value":"AG" ,"text":"Agrigento"},
        { "value":"AN" ,"text":"Ancona"},
        { "value":"AO" ,"text":"Aosta"},
        { "value":"AR" ,"text":"Arezzo"},
        { "value":"AP" ,"text":"Ascoli Piceno"},
        { "value":"AT" ,"text":"Asti"},
        { "value":"AV" ,"text":"Avellino"},
        { "value":"BA" ,"text":"Bari"},
        { "value":"BT" ,"text":"Barletta-Andria-Trani"},
        { "value":"BL" ,"text":"Belluno"},
        { "value":"BN" ,"text":"Benevento"},
        { "value":"BG" ,"text":"Bergamo"},
        { "value":"BI" ,"text":"Biella"},
        { "value":"BO" ,"text":"Bologna"},
        { "value":"BZ" ,"text":"Bolzano"},
        { "value":"BS" ,"text":"Brescia"},
        { "value":"BR" ,"text":"Brindisi"},
        { "value":"CA" ,"text":"Cagliari"},
        { "value":"CL" ,"text":"Caltanissetta"},
        { "value":"CB" ,"text":"Campobasso"},
        { "value":"CI" ,"text":"Carbonia-Iglesias"},
        { "value":"CE" ,"text":"Caserta"},
        { "value":"CT" ,"text":"Catania"},
        { "value":"CZ" ,"text":"Catanzaro"},
        { "value":"CH" ,"text":"Chieti"},
        { "value":"CO" ,"text":"Como"},
        { "value":"CS" ,"text":"Cosenza"},
        { "value":"CR" ,"text":"Cremona"},
        { "value":"KR" ,"text":"Crotone"},
        { "value":"CN" ,"text":"Cuneo"},
        { "value":"EN" ,"text":"Enna"},
        { "value":"FM" ,"text":"Fermo"},
        { "value":"FE" ,"text":"Ferrara"},
        { "value":"FI" ,"text":"Firenze"},
        { "value":"FG" ,"text":"Foggia"},
        { "value":"FC" ,"text":"Forlì-Cesena"},
        { "value":"FR" ,"text":"Frosinone"},
        { "value":"GE" ,"text":"Genova"},
        { "value":"GO" ,"text":"Gorizia"},
        { "value":"GR" ,"text":"Grosseto"},
        { "value":"IM" ,"text":"Imperia"},
        { "value":"IS" ,"text":"Isernia"},
        { "value":"SP" ,"text":"La Spezia"},
        { "value":"AQ" ,"text":"L'Aquila"},
        { "value":"LT" ,"text":"Latina"},
        { "value":"LE" ,"text":"Lecce"},
        { "value":"LC" ,"text":"Lecco"},
        { "value":"LI" ,"text":"Livorno"},
        { "value":"LO" ,"text":"Lodi"},
        { "value":"LU" ,"text":"Lucca"},
        { "value":"MC" ,"text":"Macerata"},
        { "value":"MN" ,"text":"Mantova"},
        { "value":"MS" ,"text":"Massa-Carrara"},
        { "value":"MT" ,"text":"Matera"},
        { "value":"ME" ,"text":"Messina"},
        { "value":"MI" ,"text":"Milano"},
        { "value":"MO" ,"text":"Modena"},
        { "value":"MB" ,"text":"Monza e della Brianza"},
        { "value":"NA" ,"text":"Napoli"},
        { "value":"NO" ,"text":"Novara"},
        { "value":"NU" ,"text":"Nuoro"},
        { "value":"OT" ,"text":"Olbia-Tempio"},
        { "value":"OR" ,"text":"Oristano"},
        { "value":"PD" ,"text":"Padova"},
        { "value":"PA" ,"text":"Palermo"},
        { "value":"PR" ,"text":"Parma"},
        { "value":"PV" ,"text":"Pavia"},
        { "value":"PG" ,"text":"Perugia"},
        { "value":"PU" ,"text":"Pesaro e Urbino"},
        { "value":"PE" ,"text":"Pescara"},
        { "value":"PC" ,"text":"Piacenza"},
        { "value":"PI" ,"text":"Pisa"},
        { "value":"PT" ,"text":"Pistoia"},
        { "value":"PN" ,"text":"Pordenone"},
        { "value":"PZ" ,"text":"Potenza"},
        { "value":"PO" ,"text":"Prato"},
        { "value":"RG" ,"text":"Ragusa"},
        { "value":"RA" ,"text":"Ravenna"},
        { "value":"RC" ,"text":"Reggio Calabria"},
        { "value":"RE" ,"text":"Reggio Emilia"},
        { "value":"RI" ,"text":"Rieti"},
        { "value":"RN" ,"text":"Rimini"},
        { "value":"RM" ,"text":"Roma"},
        { "value":"RO" ,"text":"Rovigo"},
        { "value":"SA" ,"text":"Salerno"},
        { "value":"VS" ,"text":"Medio Campidano"},
        { "value":"SS" ,"text":"Sassari"},
        { "value":"SV" ,"text":"Savona"},
        { "value":"SI" ,"text":"Siena"},
        { "value":"SR" ,"text":"Siracusa"},
        { "value":"SO" ,"text":"Sondrio"},
        { "value":"TA" ,"text":"Taranto"},
        { "value":"TE" ,"text":"Teramo"},
        { "value":"TR" ,"text":"Terni"},
        { "value":"TO" ,"text":"Torino"},
        { "value":"OG" ,"text":"Ogliastra"},
        { "value":"TP" ,"text":"Trapani"},
        { "value":"TN" ,"text":"Trento"},
        { "value":"TV" ,"text":"Treviso"},
        { "value":"TS" ,"text":"Trieste"},
        { "value":"UD" ,"text":"Udine"},
        { "value":"VA" ,"text":"Varese"},
        { "value":"VE" ,"text":"Venezia"},
        { "value":"VB" ,"text":"Verbano-Cusio-Ossola"},
        { "value":"VC" ,"text":"Vercelli"},
        { "value":"VR" ,"text":"Verona"},
        { "value":"VV" ,"text":"Vibo Valentia"},
        { "value":"VI" ,"text":"Vicenza"},
        { "value":"VT" ,"text":"Viterbo"}
      ],
      regions,
      list: [],
      recordList: [],
      record: {},
      $record: {},
      addRecord: {},
      resetItem: {},
      grid: {pagination: {}},
      mode: 'list',
      searchActive: false,
      loaded: false,
      filter: {click_date: [today, today]}
    }
}

const root = {root: true}

export const mutations = {
    setSearchActive (state, payload) { state.searchActive = payload },
    setRecordList (state, payload) { state.recordList = payload },
    setPagination (state, payload) { state.pagination = payload },
    setList (state, payload) {
        state.list = payload
        state.loaded = true
    },
    setAllRegions (state) {
      state.$record.region = allRegions()
    },

    setRecord (state, payload) {
        state.record = _cloneDeep(payload)
        state.$record = _cloneDeep(payload)
        state.loaded = true
    },
    set$Record (state, payload) {
        state.$record = _cloneDeep(payload)
        state.loaded = true
    },
    updateItemList (state,  {data, index}) {
        Vue.set(state.list, index, data)
    },
    addRecord (state,  p ) {
        state.list.push(p)
    },
    reset$Record (state) {
        state.$record = {}
    },
    setMode (state, payload) { state.mode = payload },
    setForm (state, payload) { state.form = payload },
    setEditMode (state) { state.mode = 'edit' },
    setAddMode (state) { state.mode = 'add' }

}
export const actions = {
    load ({dispatch, commit, state}, {id = null, force = true, options = {}}) {
        if (!force && state.list.length > 0) {
            return
        }
        if (id === null) {
            return dispatch('api/post', {url: `/api/campaigns/locations`, options, debug: false}, root)
                .then(res => {
                    commit('setList', res.data)
                    return res
                })
        } else {
            return dispatch('api/get', {url: `/api/locations/{id}`, options}, root)
                .then(res => {
                    commit('setRecord', res.data)
                    return res
                })
        }
    },
}

export const getters = {
    isEditMode: state => state.mode === 'edit',
    isAddMode: state => state.mode === 'add'
}

