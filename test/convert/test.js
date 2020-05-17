const fs = require('fs')
const { generateRequst } = require('./generate-request')
const { handler } = require('convert-csv')

const { expect } = require('chai')
const { getFile } = require('storage')
const { download } = require('./download-file')

describe('csvの変換テスト', async () => {
  it('csvのダウンロードテスト', async () => {
    const request = await generateRequst({
      csv: fs.readFileSync('test/assets/test.csv'),
      settings: require('./convert-settings/download-test'),
      encode: 'UTF8'
    })
    const result = await handler(request)
    expect(result.statusCode).to.equal(200)

    const resultBody = JSON.parse(result.body)

    const generatedFile = await getFile(resultBody.fileKey)
    const expected = '"test","変換","試験"\n"test","試験(変換)","テスト値"\n'
    expect(generatedFile).to.equal(expected)

    const downloadUtfFile = await download(resultBody.url, 'UTF8')
    expect(generatedFile).to.equal(downloadUtfFile)
  })
})
