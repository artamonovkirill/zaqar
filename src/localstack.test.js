const {GenericContainer, Wait} = require('testcontainers')

let container

exports.start = async () => {
    if (container) return container

    process.env.AWS_REGION = 'us-east-1'

    container = await new GenericContainer('localstack/localstack-light', '0.12.2')
        .withExposedPorts(4566)
        .withWaitStrategy(Wait.forLogMessage('Ready.'))
        .withEnv('SERVICES', 'kms')
        .start()

    process.env.AWS_ACCESS_KEY_ID = 'foo'
    process.env.AWS_SECRET_ACCESS_KEY = 'bar'
    process.env.AWS_KMS_ENDPOINT = `http://${container.getHost()}:${container.getMappedPort(4566)}`
}

exports.stop = async () => {
    if (container) await container.stop()
    container = null
}
