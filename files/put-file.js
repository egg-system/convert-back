const encoding = require('encoding-japanese')
const { putFile } = require('storage')

/* global TextDecoder */
const hadnlePutMethod = async ({ fileKey, file }) => {
  const encode = encoding.detect(file)
  const content = new TextDecoder(encode).decode(file)

  await putFile(fileKey, content)
  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONT
    }
  }
}

module.exports = {
  hadnlePutMethod
}
