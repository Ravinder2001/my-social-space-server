const jwt = require("jsonwebtoken");
const config = require("../configuration/config");
const { HttpStatus, USER_TYPES } = require("../utils/constant/constant");
/**
 * Sends a successful JSON response with the specified message, optional status code, and optional data.
 * @author Vishal Sinha
 * @param {Object} res - The Express response object.
 * @param {string} message - The message to be included in the response.
 * @param {number} [status=200] - The HTTP status code to be set for the response. Default is 200 (OK).
 * @param {any} [data] - Additional data to be included in the response.
 * @returns {Object} The Express response object.
 */
function successResponse(res, message, status = 200, data, count = null) {
  if (status === undefined) {
    status = 200;
  }
  return res.status(status).json({
    success: 1,
    message: message,
    data: data,
    ...(count >= 0 && count != null && { count: count }),
  });
}

/**
 * Sends a Error JSON response with the specified message, optional status code, and optional data.
 * @author Vishal Sinha
 * @param {Object} res - The Express response object.
 * @param {string} message - The message to be included in the response.
 * @param {number} [status=500] - The HTTP status code to be set for the response. Default is 200 (OK).
 * @param {any} [data] - Additional data to be included in the response.
 * @returns {Object} The Express response object.
 */
function errorResponse(res, message, status = 500) {
  if (status === undefined) {
    status = 500;
  }
  return res.status(status).json({ success: 0, message: message });
}

/**
 * @desc Common error handling for Business logic controller
 * @author Vishal Sinha
 * @param {error} - custom error
 * @param {*} res
 * @returns
 */
const handleAsyncError = (error, res) => {
  // common.logError(error); will add logger here
  console.log(error);

  return errorResponse(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
};

/**
 * @desc Function to check empty object
 * @param {object} obj
 * @returns true/false
 */
const isEmptyObj = (obj) => {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

const generateTokenFromSuperAdminDetails = (data) => {
  return jwt.sign(
    {
      iss: "Radisson-blu",
      id: data.user_id,
      name: data.username,
      role: USER_TYPES.SUPERADMIN,
      iat: Math.round(new Date().getTime() / 1000),
      // exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
    },
    config.jwt.secretKey,
    {
      expiresIn: "1d",
    }
  );
};
const generateTokenFromUserDetails = (data) => {
  return jwt.sign(
    {
      iss: "Radisson-blu",
      id: data.user_id,
      name: data.username,
      // email: encryptText(data.email),
      role: USER_TYPES.ADMIN,
      is_master: data.master_login ? true : false,
      iat: Math.round(new Date().getTime() / 1000),
      // exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
    },
    config.jwt.secretKey,
    {
      expiresIn: "5d",
    }
  );
};

const generateStaffTokenFromUserDetails = (data) => {
  return jwt.sign(
    {
      iss: "Radisson-blu",
      id: data.user_id,
      name: data.username,
      role: USER_TYPES.STAFF,
      is_master: data.master_login,
      level: data.level,
      iat: Math.round(new Date().getTime() / 1000),
      // exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
    },
    config.jwt.secretKey,
    {
      expiresIn: "5d",
    }
  );
};
// const logError = async (err) => {
//   let errorText = getErrorText(err);
//   let matches = err.stack.split('\n');
//   // Function to extract file and line information
//   const extractFileInfo = (line) => {
//     const match = line.trim().match(/(.+\.js):(\d+):(\d+)\)/);
//     if (match) {
//       const errorFile = match[0];
//       const errorLine = match[2];
//       return { errorFile, errorLine };
//     }
//     return null;
//   };

//   let fileInfo = null;

//   for (let i = 1; i < matches.length; i++) {
//     fileInfo = extractFileInfo(matches[i]);
//     if (fileInfo) {
//       break;
//     }
//   }

//   if (fileInfo) {
//     const { errorFile, errorLine } = fileInfo;

//     let now = new Date();
//     let date_format = dateFormat(now, 'yyyy-mm-dd HH:MM:ss');

//     let errMsg = `\n DateTime: ${date_format} \n ${errorText} \n Line No : ${errorLine} \n File Path: ${errorFile} \n`;

//     console.log({ errMsg });

//     // LOG ERR
//     const today = new Date();
//     const logDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
//     const logFilePath = path.join(__dirname, '../logs', `error-${logDate}.log`);
//     fs.appendFile(logFilePath, errMsg, (err) => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//     });
//     await cloudWatchLog(errMsg); // send logs to aws cloudwatch
//   }
//   return;
// };

module.exports = {
  errorResponse: errorResponse,
  isEmptyObj,
  generateTokenFromSuperAdminDetails,
  generateTokenFromUserDetails,
  generateStaffTokenFromUserDetails,
  successResponse,
  handleAsyncError,
};
