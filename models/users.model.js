const client = require("../config/db");

module.exports = {
  RegisterUser: ({ id, name, email, password }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `INSERT INTO users (id,name,email,password) VALUES($1,$2,$3,$4) RETURNING id,name`,
          [id, name, email, password]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  LoginUser: ({ email }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT id,name,password FROM users WHERE email=$1`,
          [email]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FindUserById: ({ id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT id,created_at FROM users WHERE id=$1`,
          [id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UpdateProfileData: ({ id, job, location }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `UPDATE users SET job=$2,location=$3 WHERE id=$1`,
          [id, job, location]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

  AddProfilePicture: ({ user_id, image }) => {
    return new Promise((resolve, reject) => {
      try {
        const selectQuery = `SELECT * FROM profile_pictures WHERE user_id = $1`;

        client
          .query(selectQuery, [user_id])
          .then((result) => {
            if (result.rows.length > 0) {
              const updateQuery = `UPDATE profile_pictures SET image_url = $1 WHERE user_id = $2`;

              return client.query(updateQuery, [image, user_id]);
            } else {
              const insertQuery = `INSERT INTO profile_pictures (user_id, image_url) VALUES ($1, $2)`;

              return client.query(insertQuery, [user_id, image]);
            }
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  },

  GetProfilePicture: ({ user_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT image_url FROM profile_pictures WHERE user_id=$1`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteProfilePicture: ({ user_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `DELETE FROM profile_pictures WHERE user_id=$1`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetAllUsers: ({ name }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT users.id,name,profile_pictures.image_url
          FROM users
          LEFT JOIN profile_pictures ON profile_pictures.user_id = users.id
          WHERE name ILIKE $1 OR users.id ILIKE $1`,
          [`%${name}%`]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetUserInfo: ({ user_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT users.name,COUNT(posts.id) AS posts_count, COUNT(friends.id) AS friends_count
          FROM users
          LEFT JOIN posts ON posts.user_id = users.id
          LEFT JOIN friends ON (friends.user1_id = users.id OR friends.user2_id = users.id)
          WHERE users.id=$1
          GROUP BY users.name
          `,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetProfileData: ({ id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT
          users.name,
          users.created_at,
          users.job,
          users.location,
          COUNT(posts.id) AS post_count,
          COUNT(friends.id) AS friend_count,
          profile_pictures.image_url as profile_picture
      FROM users
      LEFT JOIN posts ON posts.user_id = users.id
      LEFT JOIN friends ON (friends.user1_id = users.id OR friends.user2_id = users.id)
      LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
      WHERE users.id = $1
      GROUP BY users.name,users.created_at, users.job, users.location,profile_pictures.image_url;
      `,
          [id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetAnotherUserProfileData: ({ secondary_user, main_user }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT
          users.name,
          users.created_at,
          users.job,
          users.location,
          COUNT(posts.id) AS post_count,
          COUNT(friends.id) AS friend_count,
          profile_pictures.image_url as profile_picture,
          (
          SELECT COUNT(*)
          FROM friends 
          WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)
          ) AS isFriends,
          (
            SELECT COUNT(*)
          FROM friend_requests 
          WHERE sender_id = $2 AND receiver_id = $1
          ) as friend_request_sent,
          (
          SELECT COUNT(*)
          FROM friend_requests 
          WHERE sender_id = $1 AND receiver_id = $2
          ) as friend_request_received
      FROM users
      LEFT JOIN posts ON posts.user_id = users.id
      LEFT JOIN friends ON (friends.user1_id = users.id OR friends.user2_id = users.id)
      LEFT JOIN profile_pictures ON profile_pictures.user_id = users.id
      WHERE users.id = $1
      GROUP BY users.name,users.created_at, users.job, users.location, profile_pictures.image_url
      `,
          [secondary_user, main_user]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddUserOnlineStatus: ({ user_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `INSERT INTO user_online_status(user_id) VALUES($1)`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UpdateUserOnlineStatus: ({ user_id, status }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `UPDATE user_online_status SET status=$2,timestamp=CURRENT_TIMESTAMP WHERE user_id =$1`,
          [user_id, status]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetUserOnlineStatus: ({ user_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT status,timestamp FROM user_online_status WHERE user_id =$1`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
