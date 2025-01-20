const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  jwt: {
    secretKey: process.env.SECRET,
  },
  s3_bucket: {
    access_key: process.env.AWS_ACCESS_KEY_ID,
    secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    bucket_name: process.env.AWS_BUCKET_NAME,
    bucket_region: process.env.AWS_REGION,
  },
  cryptR: {
    secret: process.env.CRYPTO_SECRET_KEY,
  },
  google: {
    google_client_id: process.env.GOOGLE_CLIENT_ID,
  },
};

module.exports = config;
