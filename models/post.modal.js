const client = require("../config/db");

module.exports = {
  AddPost: ({ id, user_id, caption }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO posts(id,user_id,caption) VALUES ($1,$2,$3)`,
          [id, user_id, caption]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddPostImages: ({ post_id, image }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO post_images (post_id,image_url) VALUES($1,$2)`,
          [post_id, image]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetPost: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT users.name AS user_name,posts.id AS post_id,posts.caption,posts.created_at,
          ARRAY_AGG(JSON_BUILD_OBJECT('image_id',post_images.id,'image_url',post_images.image_url)) as images 
          FROM posts 
          LEFT JOIN post_images ON post_images.post_id=posts.id 
          LEFT JOIN users ON users.id=posts.user_id
          WHERE posts.user_id=$1 AND users.status=true
          GROUP BY users.name,posts.id,posts.caption,posts.created_at`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeletePost: ({ post_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `DELETE FROM posts WHERE id=$1`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
