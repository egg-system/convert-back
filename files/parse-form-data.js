const Busboy = require('busboy')

const extractRequestBody = ({ resolve, event }) => {
    const busboy = new Busboy({ headers: event.headers })

    const body = {}
    busboy.on('file', (fieldname, file) => {
        file.on('data', (data) => body.file = data)
    })

    busboy.on('field', (fieldname, value) => body[fieldname] = value)
    busboy.on('finish', () => resolve(body))
    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'utf8')
    busboy.end()
}

const parseFormData = async (event) => {
    if (Object.keys(event.headers).includes('Content-Type')) {
        event.headers['content-type'] = event.headers['Content-Type']
    }

    // jsonの場合は、parseのみ実行する
    if (/application\/json/.test(event.headers['content-type'])) {
        return JSON.parse(event.body)
    }

    return await new Promise((resolve) => {
        extractRequestBody({ resolve, event })
    })
}

module.exports = {
    parseFormData
}
