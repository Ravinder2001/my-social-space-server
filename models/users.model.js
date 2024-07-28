const db = require("../configuration/db");
const generateTimestamp = require("../helpers/timestamp");

module.exports = {
  register: async (values) => {
    try {
      const query = `INSERT INTO tbl_users(first_name,last_name,email,password,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
      const result = await db.query(query, [
        values.first_name,
        values.last_name,
        values.email,
        values.password,
        generateTimestamp(),
        generateTimestamp(),
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error while adding zone", error.message);
      throw error;
    }
  },
  login: async (values) => {
    try {
      const query = `SELECT * FROM tbl_users WHERE email = $1`;
      const result = await db.query(query, [values.email]);
      return result.rows[0];
    } catch (error) {
      console.error("Error while adding zone", error.message);
      throw error;
    }
  },
};
