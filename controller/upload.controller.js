const common = require("./common.controller");
const { HttpStatus } = require("../utils/constant/constant");

const imageTrashModel = require("../model/upload.model");
const { generatePreSignedURL, uploadImageToS3, deleteImageFromS3 } = require("../utils/common/imageUploadToS3");
const Messages = require("../utils/constant/messages");

module.exports = {
  fileUpload: async (req, res) => {
    try {
      const userId = req.user.user_id;

      if (!req.files || req.files.length === 0) {
        return common.errorResponse(res, Messages.FILE_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const keyPrefix = `USER-${userId}`;
      const uploadedImages = [];

      for (const image of req.files) {
        const timestamp = Date.now();
        const randomDigits = Math.floor(100 + Math.random() * 900);
        const imageName = `${timestamp}_${randomDigits}_${image.originalname}`;
        const imageKey = `${keyPrefix}/${imageName}`;

        // Upload image to S3
        await uploadImageToS3(image, imageKey);

        // Generate URL
        const url = await generatePreSignedURL(imageKey);

        // Add image to trash for potential rollback
        await imageTrashModel.addFilesToTrash([imageKey]);

        uploadedImages.push({ key: imageKey, url });
      }

      return common.successResponse(res, Messages.FILE_UPLOAD_SUCCESS, HttpStatus.OK, uploadedImages);
    } catch (error) {
      return common.handleAsyncError(error, res);
    }
  },
  deleteExpiredFilesFromS3AndDB: async () => {
    try {
      // Step 1: Fetch expired files
      const expiredImages = await imageTrashModel.getExpiredFiles();

      if (expiredImages.length === 0) {
        console.log("No expired files to delete.");
        return;
      }

      // Step 2: Delete each file from S3
      for (const imageUrl of expiredImages) {
        await deleteImageFromS3(imageUrl);
      }

      // Step 3: Remove files from the database
      await imageTrashModel.removeFilesFromTrash(expiredImages);

      console.log(`Deleted ${expiredImages.length} expired files from S3 and database.`);
    } catch (error) {
      console.error("Error deleting expired files from S3 and database:", error);
      throw error;
    }
  },
};
