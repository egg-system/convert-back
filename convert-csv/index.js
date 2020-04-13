const { getFile } = require('storage')
const parse = require('csv-parse/lib/sync')
const stringify = require('csv-stringify/lib/sync')

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await handleGetMethod(event.queryStringParameters)
  }
  
  return {
    statusCode: 403,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONT,
    },
    body: 'method is not allowed'
  }
}

const handleGetMethod = async (params) => {
  const results = await Promise.all([
    getFile(params.csv),
    getFile(params.settings)
  ])

  const csv = results[0]
  const settings = JSON.parse(results[1])

  const convertedCsvArray = convertCsv(csv, settings)
  const convertedCsv = stringify(convertedCsvArray, {
    quoted: true
  })

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONT,
      "Content-Disposition": "attachment",
      "Content-Type": "text/csv"
    },
    body: convertedCsv
  }
}

const convertCsv = (csv, settings) => {
  // 同名のheaderがある場合、挙動がおかしくなるので、headerは数値にする
  const fromHeaders = settings.csvHeaders.map(header => header.value.toString())
  const fromValues = parse(csv, { from_line: 2, columns: fromHeaders })

  const converters = settings.convertSettings
  const convertedCsvHeader = converters.map(converter => converter.name)

  const convertedCsv = fromValues.map(record => convertCsvRecord(record, converters))
  convertedCsv.unshift(convertedCsvHeader)

  return convertedCsv
}

const convertCsvRecord = (record, converters) => {
  return converters.map(converter => {
    if (converter.fixedValue) {
      return converter.fixedValue
    }

    const fromIndex = converter.fromIndex.toString()
    const fromValue = record[fromIndex]

    return fromValue
  })
}
