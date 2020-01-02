import browserLocale from 'browser-locale'
let curLocale = browserLocale()
let aLocale = curLocale.split('-')

curLocale = aLocale[0]
export const locale = curLocale

export const getSchema = () => {
  let schema = 'prod'
  // if (process.env.NODE_ENV === 'development') schema = 'dev'
  return schema
}
export const getServer = () => {
  let server = 'https://privacy.dataone.online'
  if (process.env.NODE_ENV === 'development') {
    server = 'http://localhost'
  }

  return server
}
export const extractFlags = (paragraphs, termId) => {
  if (!paragraphs) {
    return []
  }
  const flags = []
  for (let i = 0; i < paragraphs.length; i++) {
    let p = paragraphs[i]
    for (let j = 0; j < p.treatments.length; j++) {
      const {code, selected, mandatory} = p.treatments[j]
      flags.push({code, selected, mandatory, termId})
    }
  }
  return flags
}

export const formatDate = (date) => {
  // console.log('---- formatDate', date)
  if (!date) return null
  const [year, month, day] = date.split('-')
  return `${month}/${day}/${year}`
}

export const parseDate = (date) => {
  // console.log('---- parse', date)
  if (!date) return null
  const [month, day, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}
