const client = require("../config/db");

module.exports = {
  DeleteExpiredStory: () => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`DELETE FROM story WHERE expire_at < NOW();`);
        console.log("Expired Stories Deleted");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteExpiredPosts: () => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`DELETE FROM posts WHERE upload_till < NOW();`);
        console.log("Expired Posts Deleted");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
