const aws = require('aws-sdk')
aws.config.region = process.env.REGION
const s3 = new aws.S3()

module.exports = { s3 }
