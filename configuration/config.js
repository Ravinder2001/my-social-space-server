const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB: {
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  jwt: {
    secret_key: process.env.JWT_SECRET_KEY,
  },
  s3_bucket: {
    access_key: process.env.ACCESS_KEY,
    secret_key: process.env.SECRET_KEY,
    bucket_name: process.env.BUCKET_NAME,
    bucket_region: process.env.BUCKET_REGION,
  },
  firebase: {
    project_id: process.env.PROJECT_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
  },
  domain: process.env.DOMAIN,
  localhost_domain: process.env.LOCALHOST_DOMAIN,
};
module.exports = config;
