const fc = require('fast-check')
const messages = require('./messages')

describe('Messages', () => {
    test.each(['error', 'info'])('%s message are random', level => {
        const ms = new Set([...Array(5).keys()].map(_ => messages.get(level)))
        expect(ms.size).toBeGreaterThan(1)
    })
    it('do not get info indexes out of bound', () => {
        fc.assert(fc.property(fc.anything(), () => messages.get('info') != null))
    })
    it('do not get error indexes out of bound', () => {
        fc.assert(fc.property(fc.anything(), () => messages.get('error') != null))
    })
})