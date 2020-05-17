const { s3 } = require('./get-s3.js')

const putFile = async (fileKey, body) => {
  const putParams = {
    Bucket: process.env.BUCKET,
    Key: fileKey,
    Body: body
  }

  try {
    return await s3.putObject(putParams).promise()
  } catch (error) {
    console.log(error)
    return null
  }
}

const getFile = async (fileKey) => {
  const s3Config = {
    Bucket: process.env.BUCKET,
    Key: fileKey
  }

  try {
    const { Body } = await s3.getObject(s3Config).promise()
    return Body.toString()
  } catch (error) {
    console.log(error)
    return null
  }
}

const downloadUrl = async (fileKey) => {
  const s3Config = {
    Bucket: process.env.BUCKET,
    Key: fileKey,
    Expires: Number(process.env.EXPIRES)
  }

  try {
    return await s3.getSignedUrl('getObject', s3Config)
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = { getFile, putFile, downloadUrl }
