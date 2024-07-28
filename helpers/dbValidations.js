const db = require("../configuration/db");
const { HttpStatus } = require("../shared/constant");

const dbValidation = async (id, tbl_name, column_name, added_condition) => {
  if (!id || id === "null" || isNaN(parseInt(id))) {
    return HttpStatus.BAD_REQUEST;
  }
  try {
    let query = `SELECT * FROM ${tbl_name} WHERE ${column_name} = $1`;
    let params = [id];

    if (added_condition) {
      query += ` AND ${added_condition}`;
    }

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return HttpStatus.NOT_FOUND;
    }
    return HttpStatus.OK;
  } catch (error) {
    throw new Error(error.message);
  }
};

const dbValidationForDuplicate = async (value, tbl_name, column_name) => {
  if (!value || value === "null") {
    return HttpStatus.BAD_REQUEST;
  }
  try {
    const result = await db.query(`SELECT * FROM ${tbl_name} WHERE ${column_name} ILIKE $1`, [value]);
    if (result.rows.length > 0) {
      return HttpStatus.ALREADY_EXISTS;
    }
    return HttpStatus.OK;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { dbValidation, dbValidationForDuplicate };
