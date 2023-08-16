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
        const response = client.query(`SELECT id,created_at FROM users WHERE id=$1`, [id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddProfilePicture: ({ user_id, image }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `INSERT INTO profile_pictures(user_id,image_url) VALUES($1,$2)`,
          [user_id, image]
        );
        resolve(response);
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
};
