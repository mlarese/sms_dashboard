import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import Notifications from 'vue-notification'
import {dmy, time, truncate, statusIdToText} from '../assets/filters'
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
import 'vue2-datepicker/index.css';

Vue.use(Vuetify, {
  theme: {
    // primary: '#121212', // a color that is not in the material colors palette
    // accent: colors.grey.darken3,
    // secondary: colors.amber.darken3,
    // info: colors.teal.lighten1,
    // warning: colors.amber.base,
    // error: colors.deepOrange.accent4,
    // success: colors.green.accent3
  }
})
Vue.use(Notifications)
Vue.filter('dmy', dmy)
Vue.filter('time', time)
Vue.filter('truncate', truncate)
Vue.filter('statusIdToText', statusIdToText)
Vue.filter('numFormat', numFormat(numeral));
