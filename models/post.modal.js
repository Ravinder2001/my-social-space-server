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
          `SELECT users.name AS user_name,profile_pictures.image_url as profile_picture,posts.id AS post_id,posts.caption,posts.created_at,
          CASE WHEN COUNT(post_images.post_id)>0 THEN ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('image_url',post_images.image_url))
          ELSE ARRAY[]::JSONB[] END AS images
          FROM posts 
          LEFT JOIN post_images ON post_images.post_id=posts.id 
          LEFT JOIN users ON users.id=posts.user_id 
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          WHERE posts.user_id=$1 AND users.status=true
          GROUP BY users.name,posts.id,posts.caption,posts.created_at,profile_pictures.image_url`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetComments: ({ post_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT users.name as username,profile_pictures.image_url,comments.content,comments.created_at
          FROM comments 
          LEFT JOIN users ON users.id=comments.user_id
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          WHERE post_id=$1`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetLikes: ({ post_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT users.id,users.name as username,profile_pictures.image_url
          FROM likes 
          LEFT JOIN users ON users.id=likes.user_id
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          WHERE post_id=$1`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeletePost: ({ post_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `DELETE FROM posts WHERE id=$1 AND user_id=$2`,
          [post_id, user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddComment: ({ post_id, user_id, content }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO comments(post_id,user_id,content) VALUES($1,$2,$3)`,
          [post_id, user_id, content]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddLike: ({ post_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO likes(post_id,user_id) VALUES($1,$2)`,
          [post_id, user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  RemoveLike: ({ post_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `DELETE FROM likes WHERE post_id=$1 AND user_id=$2`,
          [post_id, user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FindPostById: ({ id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`SELECT id FROM posts WHERE id=$1`, [id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetPostWithPostId: ({ post_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT users.name AS user_name,profile_pictures.image_url as profile_picture,posts.id AS post_id,posts.caption,posts.created_at,
          ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('image_url',post_images.image_url)) as images,
          CASE WHEN COUNT(likes.post_id)>0 THEN ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('username',users.name,'image_url',profile_pictures.image_url)) ELSE
          ARRAY[]::JSONB[] END AS likes,
          CASE WHEN COUNT(comments.post_id)>0 THEN ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT
          ('content',comments.content,'created_at',comments.created_at,'username',users.name,'image_url',profile_pictures.image_url)) ELSE ARRAY[]::JSONB[] END AS comments
          FROM posts 
          LEFT JOIN post_images ON post_images.post_id=posts.id 
          LEFT JOIN users ON users.id=posts.user_id
          LEFT JOIN comments ON comments.post_id=posts.id 
          LEFT JOIN likes ON likes.post_id=posts.id 
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          WHERE posts.id=$1 AND users.status=true
          GROUP BY users.name,posts.id,posts.caption,posts.created_at,profile_pictures.image_url`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
