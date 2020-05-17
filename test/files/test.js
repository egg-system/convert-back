const { expect } = require('chai')

const { handler } = require('files')
const fs = require('fs')
const { generateRequest } = require('./generete-form-request')

const { getFile } = require('storage')

describe('filesのテスト', async () => {
  it('sjisのcsvのアップロードテスト', async () => {
    const csvBuffer = fs.readFileSync('test/assets/sjis.csv')
    const request = generateRequest({
      file: csvBuffer,
      fileKey: 'sjis-test'
    })

    const result = await handler(request)
    expect(result.statusCode).to.equal(201)

    const putFile = new TextDecoder('SJIS').decode(csvBuffer)
    const resultFile = await getFile('sjis-test')
    expect(resultFile).to.equal(putFile)
  })

  it('jsonのアップロードテスト', async () => {
    const putFile = JSON.stringify({ test: 'test' })
    const request = {
      headers: { 'content-type': 'application/json' },
      httpMethod: 'PUT',
      body: JSON.stringify({
        file: putFile,
        fileKey: 'test'
      })
    }

    const result = await handler(request)
    expect(result.statusCode).to.equal(201)

    const resultFile = await getFile('test')
    expect(resultFile).to.equal(putFile)
  })
})
