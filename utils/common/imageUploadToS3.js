const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3_bucket } = require("../../configuration/config");
const { s3 } = require("../../service/s3-config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports = {
  uploadImageToS3: async (image, Key) => {
    try {
      const params = {
        Bucket: s3_bucket.bucket_name,
        Key,
        Body: image.buffer,
        ContentType: image.mimetype,
      };

      const command = new PutObjectCommand(params);
      const imageresponse = await s3.send(command);

      if (imageresponse.$metadata.httpStatusCode === 200) {
        return { url: Key, isImageUploaded: true };
      }
    } catch (err) {
      return {
        error: {
          message: err.message,
        },
      };
    }
  },
  deleteImageFromS3: async (Key) => {
    try {
      const params = {
        Bucket: s3_bucket.bucket_name,
        Key,
      };

      const command = new DeleteObjectCommand(params);
      const imageresponse = await s3.send(command);

      if (imageresponse.$metadata.httpStatusCode === 200) {
        return { isImageDeleted: true };
      }
    } catch (err) {
      return {
        error: {
          message: err.message,
        },
      };
    }
  },
  generatePreSignedURL: async (Key) => {
    const getObjectCommand = new GetObjectCommand({
      Bucket: s3_bucket.bucket_name,
      Key: Key,
    });
    const signedUrl = await getSignedUrl(s3, getObjectCommand);

    return signedUrl;
  },
};
