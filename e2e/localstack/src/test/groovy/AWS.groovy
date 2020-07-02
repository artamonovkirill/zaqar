import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.awscore.client.builder.AwsSyncClientBuilder
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.cloudwatchlogs.CloudWatchLogsClient
import software.amazon.awssdk.services.iam.IamClient
import software.amazon.awssdk.services.kms.KmsClient
import software.amazon.awssdk.services.lambda.LambdaClient
import software.amazon.awssdk.services.s3.S3Client
import spock.util.concurrent.PollingConditions

import java.util.function.Supplier

class AWS {
    static S3Client s3(LocalStack localstack) {
        def s3 = client({ S3Client.builder() }, localstack)
        new PollingConditions(timeout: 60).eventually {
            s3.listBuckets()
        }
        s3
    }

    static LambdaClient lambda(LocalStack localstack) {
        client({ LambdaClient.builder() }, localstack)
    }

    static IamClient iam(LocalStack localstack) {
        client({ IamClient.builder() }, localstack)
    }

    static CloudWatchLogsClient cloudWatchLogs(LocalStack localstack) {
        client({ CloudWatchLogsClient.builder() }, localstack)
    }

    static KmsClient kms(LocalStack localstack) {
        client({ KmsClient.builder() }, localstack)
    }

    private static <A extends AwsSyncClientBuilder<A, B>, B> B client(
            Supplier<AwsSyncClientBuilder<A, B>> supplier,
            LocalStack localstack) {
        supplier.get()
                .credentialsProvider(credentials(localstack))
                .region(Region.of('eu-west-1'))
                .endpointOverride(localstack.endpoint)
                .build()
    }

    private static credentials(LocalStack localstack) {
        def credentials = AwsBasicCredentials.create(localstack.accessKey, localstack.secretKey)
        StaticCredentialsProvider.create(credentials)
    }
}
