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
  GetProfileData: ({ id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT created_at,job,location FROM users WHERE id=$1`,
          [id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
