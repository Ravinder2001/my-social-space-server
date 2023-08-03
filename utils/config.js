const dotenv = require("dotenv");
dotenv.config();

const config = {
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_expires_in: process.env.JWT_EXPIRATION,
  cusotm_jwt_expires_in: process.env.CUSTOM_JWT_EXPIRATION,
  project_id: process.env.PROJECT_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  domain: process.env.DOMAIN,
  access_key: process.env.ACCESS_KEY,
  secret_key: process.env.SECRET_KEY,
  bucket_name: process.env.BUCKET_NAME,
  bucket_region: process.env.BUCKET_REGION,
};
module.exports = config;
