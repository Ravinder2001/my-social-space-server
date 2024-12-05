const cron = require("node-cron");
const { deleteExpiredFilesFromS3AndDB } = require("../controller/comman/upload.controller");

//Job is executing at 00:00 hrs for removing all the trashed files
cron.schedule("0 0 * * *", async () => {
  console.log("Job is executing at 00:00 hrs for removing all the trashed files");
  await deleteExpiredFilesFromS3AndDB();
});
