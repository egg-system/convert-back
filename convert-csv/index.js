const iconvLite = require('iconv-lite');
const { getFile, putFile, downloadUrl } = require('storage')
const { convetCsv } = require('./convert-csv')

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await hadnleGetMethod(event.queryStringParameters)
  }

  return {
    statusCode: 403,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONT,
    },
    body: 'method is not allowed'
  }
}

const hadnleGetMethod = async (params) => {
  const { csv, settings } = await getFiles(params)
  const convertedCsv = convetCsv({ csv, settings })
  const csvBuffer = iconvLite.encode(convertedCsv, params.encode)

  const convertedCsvKey = `${params.csv}${params.settings}/converterd.csv`
  await putFile(convertedCsvKey, csvBuffer)

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONT
    },
    body: JSON.stringify({
      url: await downloadUrl(convertedCsvKey),
      fileKey: convertedCsvKey
    })
  }
}

const getFiles = async ({ csv, settings }) => {
  const results = await Promise.all([
    getFile(csv),
    getFile(settings)
  ])

  if (!results) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": process.env.FRONT,
      },
      body: 'requested file is not found'
    }
  }

  const csvFile = results[0]
  const settingsFile = JSON.parse(results[1])
  return { csv: csvFile, settings: settingsFile }
}
