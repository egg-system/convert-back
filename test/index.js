// テスト実行時の起動処理を実行する
require('dotenv').config()

require('./utils/s3-mock')
const { s3 } = require('storage/get-s3')

before(async () => {
  const { Buckets } = await s3.listBuckets().promise()
  const bucketNames = Buckets.map((bucket) => bucket.Name)
  
  const testBucket = process.env.BUCKET
  if (!bucketNames.includes(testBucket)) {
    await s3.createBucket({ Bucket: testBucket }).promise()
  }
})

require('./files/test.js')
require('./convert/test.js')
