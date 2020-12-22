<template>
  <StatisticsList title="Statistics"/>
</template>
<script>
  import StatisticsList from '../../../components/Statistics/StatisticsList'
  export default {
    components: {
      StatisticsList
    },
    fetch ({store}) {
      store.commit('campaigns/setRecord',{
        overall_sms_sent: 0,
        lp_1c_sms_sent: 0,
        lp_2c_sms_sent: 0,
        overall_leads: 0,
        lp_1c_leads: 0,
        lp_2c_leads: 0,
        overall_conv: 0,
        lp_1c_conv: 0,
        lp_2c_conv: 0
      })
      store.dispatch('brands/load', {}, {root: true})
    }
  }
</script>
