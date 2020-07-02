const AWS = require('aws-sdk')

let _kms

const kms = () => {
    if (_kms) return _kms
    const options = {
        region: process.env.AWS_REGION
    }
    if (process.env.AWS_KMS_ENDPOINT) // for tests only
        options.endpoint = process.env.AWS_KMS_ENDPOINT
    _kms = new AWS.KMS(options)
    return _kms
}

exports.createKey = () => kms().createKey().promise().then(response => response.KeyMetadata.KeyId)

exports.encrypt = (input, keyId) => kms().encrypt({KeyId: keyId, Plaintext: input}).promise()
    .then(response => Buffer.from(response.CiphertextBlob).toString('base64'))

exports.decrypt = input => kms().decrypt({CiphertextBlob: Buffer.from(input, 'base64')}).promise()
    .then(response => Buffer.from(response.Plaintext).toString())