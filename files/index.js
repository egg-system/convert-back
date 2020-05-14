const { getFile } = require('storage')
const { hadnlePutMethod } = require('./put-file')
const { parseFormData } = require('./parse-form-data')

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await hadnleGetMethod(event.queryStringParameters)
  }

  if (event.httpMethod === "PUT") {
    const body = await parseFormData(event)
    return await hadnlePutMethod(body)
  }

  return {
    statusCode: 403,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONT,
    },
    body: 'method is not allowed'
  }
}

const hadnleGetMethod = async ({ fileKey }) => {
  const body = await getFile(fileKey)
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONT,
    },
    body: body
  }
}
