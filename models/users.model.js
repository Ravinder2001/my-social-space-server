const db = require("../configuration/db");
const generateTimestamp = require("../helpers/timestamp");

module.exports = {
  register: async (values) => {
    try {
      const query = `INSERT INTO tbl_users(first_name,last_name,email,password) VALUES($1,$2,$3,$4) RETURNING *`;
      const result = await db.query(query, [values.first_name, values.last_name, values.email, values.password]);
      return result.rows[0];
    } catch (error) {
      console.error("Error while adding zone", error.message);
      throw error;
    }
  },
};
