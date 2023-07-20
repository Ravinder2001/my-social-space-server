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
  LoginUser: ({email}) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`SELECT id,name,password FROM users WHERE email=$1`,[email]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
