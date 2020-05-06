const parse = require('csv-parse/lib/sync')
const stringify = require('csv-stringify/lib/sync')

const convetCsv = ({ csv, settings }) => {
  const convertedCsvArray = doConvertCsv({ csv, settings })
  return stringify(convertedCsvArray, {
    quoted: true
  })
}

const doConvertCsv = ({ csv, settings }) => {
  // 同名のheaderがある場合、挙動がおかしくなるので、headerは数値にする
  const fromHeaders = settings.csvHeaders.map(header => header.value.toString())
  const fromValues = parse(csv, {
    from_line: 2,
    columns: fromHeaders,
    relax_column_count: true
  })

  const convertedCsv = fromValues.map(record => convertCsvRecord({ record, settings }))
  const convertedCsvHeader = settings.convertSettings.map(converter => converter.name)
  convertedCsv.unshift(convertedCsvHeader)

  return convertedCsv
}

const doReplace = ({ fromValue, replaces }) => {
  const replacedValue = replaces.find((replace) => replace.from === fromValue)
  if (!!replacedValue) {
    return replacedValue.to
  }

  return fromValue
}

const convertCsvRecord = ({ record, settings }) => {
  return settings.convertSettings.map(converter => {
    if (!!converter.fixedValue) {
      return converter.fixedValue
    }

    const fromIndex = converter.fromIndex.toString()
    let fromValue = record[fromIndex]
    
    if (!!converter.replaceKey) {
      const replaces = settings.replaceSettings[converter.replaceKey]
      fromValue = doReplace({ fromValue, replaces })
    }

    return fromValue
  })
}

module.exports = { convetCsv }
