const usersModel = require("../model/users.model");

const generateUniqueUsername = async (fullName) => {
  const baseUsername = fullName.split(" ")[0].toLowerCase(); // Remove spaces and convert to lowercase
  let username = baseUsername;
  let counter = 1;

  // Check for uniqueness in the database
  while (await usersModel.usernameExists(username)) {
    username = `${baseUsername}${counter}`; // Append a number if username exists
    counter++;
  }

  return username;
};

module.exports = generateUniqueUsername;
