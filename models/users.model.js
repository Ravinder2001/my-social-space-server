const client = require("../config/db");

module.exports = {
  Register_User: ({ id, name, email, password }) => {
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
  Login_User: () => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`SELECT * FROM users`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
