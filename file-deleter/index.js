const moment = require('moment')
const aws = require('aws-sdk')

aws.config.region = process.env.REGION
const s3 = new aws.S3()

exports.handler = async (event) => {
  const configs = { Bucket: process.env.STORAGE }

  // ファイルの有効期限は1時間前のため、-1時間する
  //  ※ s3の日付もUTCなので、タイムゾーンは考慮不要
  const expiredAt = moment().subtract(1, 'hours')
  
  const { Contents } = await s3.listObjectsV2(configs).promise()
  const deleteKeys = Contents
    .filter((content) => {
      return expiredAt.isAfter(moment(content.LastModified))
    })
    .map((content) => ({ Key: content.Key }))
  console.log(deleteKeys)

  if (deleteKeys.length === 0) {
   return
  }

  const result = await deleteFiles(deleteKeys)
  console.log(result)
}

const deleteFiles = (deleteKeys) => {
  // promiseにしないと、削除を実行する前にlambdaが終わる
  return new Promise((resolve, errorHandler) => {
    s3.deleteObjects({
      Bucket: process.env.STORAGE,
      Delete: { Objects: deleteKeys }
    }, (error, data) => {
      if (!!error) {
        errorHandler(error)
      }
      resolve(data)
    })
  })
}
