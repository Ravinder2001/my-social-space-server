const db = require("../configuration/db");
const { HttpStatus } = require("../shared/constant");

const dbValidation = async (id, tbl_name, column_name, added_condition) => {
  try {
    let query = `SELECT * FROM ${tbl_name} WHERE ${column_name} = $1`;
    let params = [id];

    if (added_condition) {
      query += ` AND ${added_condition}`;
    }

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return { status: HttpStatus.NOT_FOUND };
    }
    return { result: result.rows[0], status: HttpStatus.OK };
  } catch (error) {
    throw new Error(error.message);
  }
};

const dbValidationForDuplicate = async (value, tbl_name, column_name) => {
  try {
    const result = await db.query(`SELECT * FROM ${tbl_name} WHERE ${column_name} ILIKE $1`, [value]);
    if (result.rows.length > 0) {
      return { status: HttpStatus.ALREADY_EXISTS };
    }
    return { status: HttpStatus.OK, result: result.rows[0] };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { dbValidation, dbValidationForDuplicate };
