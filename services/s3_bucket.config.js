const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { access_key, secret_key, bucket_region, bucket_name } = require("./utils/config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Image_Exp_Duration } = require("../utils/constant");

const s3 = new S3Client({
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
  region: bucket_region,
});

const Image_Link = async (Key) => {
  const getObjectParams = {
    Bucket: bucket_name,
    Key: Key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, {
    expiresIn: Image_Exp_Duration,
  });
  return url;
};
module.exports = { s3, Image_Link };
