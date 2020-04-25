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
  const fromValues = parse(csv, { from_line: 2, columns: fromHeaders })

  const converters = settings.convertSettings
  const convertedCsvHeader = converters.map(converter => converter.name)

  const convertedCsv = fromValues.map(record => convertCsvRecord({ record, converters }))
  convertedCsv.unshift(convertedCsvHeader)

  return convertedCsv
}

const convertCsvRecord = ({ record, converters }) => {
  return converters.map(converter => {
    if (converter.fixedValue) {
      return converter.fixedValue
    }

    const fromIndex = converter.fromIndex.toString()
    const fromValue = record[fromIndex]

    return fromValue
  })
}

module.exports = { convetCsv }