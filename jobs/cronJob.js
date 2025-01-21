const cron = require("node-cron");
const { deleteFilesFromS3 } = require("../utils/common/imageUploadToS3");
const { getExpiredFiles, removeFilesFromTrash } = require("../model/upload.model");

// Cron job to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Running cron job to clean up trash files...");
  // return
  try {
    // Query to get files older than 1 day
    const result = await getExpiredFiles();

    if (result.length > 0) {
      // Delete files from S3 in bulk
      let deletedFiles = await deleteFilesFromS3(result);

      // Delete the file records from the database

      await removeFilesFromTrash(deletedFiles.map((file) => file.Key));

      console.log("Trash files cleaned up successfully.");
    } else {
      console.log("No trash files found.");
    }
  } catch (error) {
    console.error("Error during cron job:", error);
  }
});
