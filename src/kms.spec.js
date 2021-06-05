const fc = require('fast-check')
const kms = require('./kms')
const localstack = require('./localstack.test')

let keyId
beforeAll(async () => {
    await localstack.start()
    keyId = await kms.createKey()
}, 50000)

describe('KMS', () => {
    it('decryption is the reverse of encryption',  async () => {
        await fc.assert(fc.asyncProperty(fc.webUrl(), async hook => {
            const encrypted = await kms.encrypt(hook, keyId)
            const decrypted = await kms.decrypt(encrypted, keyId)
            expect(decrypted).toEqual(hook)
        }))
    })
    test.each(['https://httpbin.org/post', 'https://hooks.slack.com/hook'])('encrypted %s is base64-encoded', async hook => {
        const result = kms.encrypt(hook, keyId)

        await expect(result).resolves.toMatch(/[A-Za-z0-9+/]+(==)?/)
    })
})

afterAll(async () => await localstack.stop())