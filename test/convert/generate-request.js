const { putFile } = require('storage')

const generateRequst = async ({ csv, settings, encode }) => {
  await putFile('csv', csv)
  await putFile('settings', JSON.stringify(settings))

  return {
    httpMethod: 'GET',
    queryStringParameters: {
      csv: 'csv',
      settings: 'settings',
      encode
    }
  }
}

module.exports = {
  generateRequst
}
