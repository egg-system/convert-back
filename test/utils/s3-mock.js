const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.REGION,
  s3: { endpoint: 'http://localhost:4572' },
  s3ForcePathStyle: true
})

const mock = require('mock-require')
s3 = new AWS.S3()
mock('storage/get-s3', { s3 })
