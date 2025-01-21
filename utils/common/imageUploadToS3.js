const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
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
    const signedUrl = await getSignedUrl(s3, getObjectCommand, {
      expiresIn: 432000,
    });

    return signedUrl;
  },
  deleteFilesFromS3: async (fileKeys) => {
    try {
      const objectsToDelete = fileKeys.map((fileKey) => ({ Key: fileKey }));

      // Create parameters for the deleteObjects call
      const params = {
        Bucket: s3_bucket.bucket_name,
        Delete: {
          Objects: objectsToDelete,
          Quiet: false, // Optional: Set to true if you don't want to receive info about the deleted objects
        },
      };

      const command = new DeleteObjectsCommand(params);
      const imageresponse = await s3.send(command);

      return imageresponse.Deleted;
    } catch (err) {
      return err;
    }
  },
};
