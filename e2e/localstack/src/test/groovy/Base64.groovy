import software.amazon.awssdk.core.SdkBytes

class Base64 {
    static String encode(SdkBytes input) {
        encode(input.asByteArray())
    }

    static String encode(byte[] input) {
        new String(java.util.Base64.encoder.encode(input))
    }
}
