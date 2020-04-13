const aws = require('aws-sdk')
aws.config.region = process.env.REGION
const s3 = new aws.S3()

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

module.exports = { getFile }
