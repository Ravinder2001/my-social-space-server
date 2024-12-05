const { S3Client } = require("@aws-sdk/client-s3");
const { s3_bucket } = require("../configuration/config");
const { SNSClient } = require("@aws-sdk/client-sns");

const s3 = new S3Client({
  credentials: {
    accessKeyId: s3_bucket.access_key,
    secretAccessKey: s3_bucket.secret_key,
  },
  region: s3_bucket.bucket_region,
});

const sns = new SNSClient({
  region: s3_bucket.bucket_region, // AWS region from environment variables
  credentials: {
    accessKeyId: s3_bucket.access_key, // AWS access key from environment variables
    secretAccessKey: s3_bucket.secret_key, // AWS secret key from environment variables
  },
});

module.exports = {
  s3,
  sns,
};
