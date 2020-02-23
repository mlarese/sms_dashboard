import formatSt from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'
import numeral from'numeral'

numeral.register('locale', 'it', {
  delimiters: { thousands: '.',  decimal: ',' },
  currency: { symbol: '€'  }
});
numeral.locale('it');

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

export const time = (date, pattern='HH:mm:ss') => {
  if (!date) return ''
  let ldate = null

  if (date.date) {
    ldate = new Date(date.date)
  } else {
    ldate = new Date(date)
  }

  const offs = -ldate.getTimezoneOffset()
  ldate = addMinutes(ldate, offs)
  return formatSt(ldate, pattern)
}

export const timeNoTZ = (date, pattern='HH:mm:ss') => {
  if (!date) return ''
  let ldate = null

  if (date.date) {
    ldate = new Date(date.date)
  } else {
    ldate = new Date(date)
  }

  return formatSt(ldate, pattern)
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

export const lpType = (value) => {
  if(!value) return ''
  return value*1===1?'One click':'Two clicks'
}
export const statusList = [{conversion_status_id:0, text:'Pending'},{conversion_status_id:1, text:'Full Conversion'},{conversion_status_id:2, text:'Likely Conversion'},{conversion_status_id:3, text:'Detractor'}]

export const number = (value, format='0,0') => {
  return numeral(value).format(format)
}
