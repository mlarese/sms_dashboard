 <!--eslint-disable-->
<template>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="dateFormatted"
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    append-icon="event"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
    </v-menu>

</template>

<script>
  export default {
    name: "DatePickerField",
    data () {
      return {
        menu: false,
        date: null,
        dateFormatted: ''
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>

<style scoped>

</style>
