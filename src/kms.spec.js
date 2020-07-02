const fc = require('fast-check')
const kms = require('./kms')
const localstack = require('./localstack.test')

let keyId
beforeAll(async () => {
    await localstack.start()
    keyId = await kms.createKey()
})

describe('KMS', () => {
    it('decryption is the reverse of encryption', () => {
        fc.assert(fc.asyncProperty(
            fc.webUrl(),
            hook => kms.encrypt(hook, keyId)
                .then(e => kms.decrypt(e))
                .then(r => r === hook)
        ))
    })
    test.each(['https://httpbin.org/post', 'https://hooks.slack.com/hook'])('encrypted %s is base64-encoded', async hook => {
        const result = kms.encrypt(hook, keyId)

        await expect(result).resolves.toMatch(/[A-Za-z0-9+/]+(==)?/)
    })
})

afterAll(async () => localstack.stop())