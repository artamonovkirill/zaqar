import org.testcontainers.containers.GenericContainer
import org.testcontainers.containers.wait.strategy.Wait

import static java.lang.System.err
import static org.testcontainers.containers.Network.newNetwork

class LocalStack {
    final GenericContainer container
    final accessKey = 'foo'
    final secretKey = 'bar'
    final region = 'eu-west-1'
    final network = newNetwork()

    LocalStack() {
        container = new GenericContainer('localstack/localstack-light:0.12.3')
                .withEnv(
                        SERVICES: 'kms,s3,lambda,iam',
                        DEFAULT_REGION: region,
                        LAMBDA_EXECUTOR: 'docker',
                        LAMBDA_DOCKER_NETWORK: network.id,
                        LAMBDA_REMOTE_DOCKER: 'true') // https://github.com/localstack/localstack/issues/3185
                .withNetwork(network)
                .withNetworkAliases('localstack')
                .withExposedPorts(4566)
                .waitingFor(Wait.forLogMessage(/.*Ready[.].*/, 1))
        container.withFileSystemBind('//var/run/docker.sock', '/var/run/docker.sock')
    }

    def start() {
        try {
            container.start()
        } catch (Exception e) {
            err.println 'LocalStack failed to start'
            err.println container.logs
            throw e
        }
    }

    def stop() {
        container.stop()
        network.close()
    }

    URI getEndpoint() {
        "http://localhost:${container.getMappedPort(4566)}".toURI()
    }
}