const bcrypt = require("bcrypt");

async function hashString(stringToHash) {
  try {
    const saltRounds = 10;
    const hashedString = await bcrypt.hash(stringToHash, saltRounds);
    return hashedString;
  } catch (error) {
    console.error("Error hashing string:", error);
    throw error;
  }
}

async function compareStrings(string, hashedString) {
  try {
    const isMatch = await bcrypt.compare(string, hashedString);
    return isMatch;
  } catch (error) {
    console.error("Error comparing strings:", error);
    throw error;
  }
}

module.exports = {
  hashString,
  compareStrings,
};
