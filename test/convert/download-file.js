const http = require('http')

const getFile = ({ resolve, error, url, encode }) => {
  let file = ''
  const request = http.get(url, (response) => {
    response.setEncoding(encode)
    response.on('data', (text) => file += text)
    response.on('end', () => resolve(file))
  })

  request.on('error', (err) => error(err))
}

const download = async (url, encode) => {
  return await new Promise((resolve, error) => getFile({
    resolve,
    error,
    url,
    encode
  }))
}

module.exports = { download }