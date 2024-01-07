const cron = require("node-cron");
const { DeleteExpiredStory, DeleteExpiredPosts } = require("../models/cronJob.modal");
const { default: axios } = require("axios");

//Job is executing in every hour
cron.schedule("0 0 */1 * * *", async () => {
  console.log("Job is executing in every hour");
  await DeleteExpiredStory();
  await DeleteExpiredPosts();
});
cron.schedule("*/5 * * * *", async () => {
  console.log("Job is executing in every 5 mins");
  await axios.get("https://mysocialspace.onrender.com/health");
});
