import formatSt from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'

export const dmySt = (date) => {
  if (!date) return ''
  let ldate = null

  if (date.date) {
    ldate = new Date(date.date)
  } else {
    ldate = new Date(date)
  }

  const offs = -ldate.getTimezoneOffset()
  ldate = addMinutes(ldate, offs)
  return formatSt(ldate, 'dd/MM/yyyy')
}

export const dmy = (date) => {
  if (!date) return ''
  let ldate = null

  if (date.date) {
    ldate = new Date(date.date)
  } else {
    ldate = new Date(date)
  }

  const offs = -ldate.getTimezoneOffset()
  ldate = addMinutes(ldate, offs)
  return formatSt(ldate, 'dd/MM/yyyy')
}

export const time = (date) => {
  if (!date) return ''
  let ldate = null

  if (date.date) {
    ldate = new Date(date.date)
  } else {
    ldate = new Date(date)
  }

  const offs = -ldate.getTimezoneOffset()
  ldate = addMinutes(ldate, offs)
  return formatSt(ldate, 'HH:mm:ss')
}

export const truncate = (value, limit, appendText='...') => {
  if(!value) return ''
  if (value.length > limit) {
    value = value.substring(0,limit) + appendText
  }
  return value
}

export const statusIdToText = (value) => {
  if(!value || !statusList[value]) return ''
  return statusList[value].text
}

export const statusList = [{conversion_status_id:0, text:'Pending'},{conversion_status_id:1, text:'Full Conversion'},{conversion_status_id:2, text:'Likely Conversion'},{conversion_status_id:3, text:'Detractor'}]
