const cron = require("node-cron");
const { DeleteExpiredStory, DeleteExpiredPosts } = require("../models/cronJob.modal");

//Job is executing in every hour
cron.schedule("0 0 */1 * * *", async () => {
  console.log("Job is executing in every hour");
  await DeleteExpiredStory();
  await DeleteExpiredPosts();
});
