const { S3Client } = require("@aws-sdk/client-s3");
const { s3_bucket } = require("../configuration/config");

const s3 = new S3Client({
  credentials: {
    accessKeyId: s3_bucket.access_key,
    secretAccessKey: s3_bucket.secret_key,
  },
  region: s3_bucket.bucket_region,
});

module.exports = {
  s3,
};
