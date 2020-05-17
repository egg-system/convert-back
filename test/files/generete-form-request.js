const FormData = require('form-data')

const generateRequest = (body) => {
  const form = new FormData
  Object.keys(body).forEach((key) => {
    form.append(key, body[key])
  })

  const boundary = form.getBoundary()
  return {
    headers: {
      'content-type': `multipart/form-data; boundary=${boundary}`
    },
    httpMethod: 'PUT',
    body: form.getBuffer().toString('base64'),
    isBase64Encoded: true
  }
}

module.exports = { generateRequest }
