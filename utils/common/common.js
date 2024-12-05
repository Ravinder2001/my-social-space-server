const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const config = require("../../configuration/config");
const jwt = require("jsonwebtoken");

const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;

const hashPassword = async function (password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

const isValidPassword = async function (newPassword, existingPassword) {
  try {
    return await bcrypt.compare(newPassword, existingPassword);
  } catch (error) {
    throw new Error(error);
  }
};

const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secretKey);
    return decoded;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const encryptString = (string) => {
  const secretKey = config.cryptR.secret;
  return CryptoJS.AES.encrypt(string, secretKey).toString();
};

const decryptString = (encryptedString) => {
  const secretKey = config.cryptR.secret;
  const bytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const generatePassword = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?!@$%&*-";
  let password = "";

  // Ensure password has at least one uppercase letter, one lowercase letter, one number, and one special character
  while (!passwordPattern.test(password)) {
    password = Array.from({ length: 10 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
  }

  return password;
};

module.exports = {
  hashPassword,
  isValidPassword,
  encryptString,
  decryptString,
  decodeJWT,
  generatePassword,
};
