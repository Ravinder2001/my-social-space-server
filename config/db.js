const { Client } = require("pg");
const { host, user, port, password, database } = require("../utils/config");

let client;

if (process.env.NODE_ENV === "production") {
  // Production database connection
  client = new Client({
    host: "production_host",
    user: "production_user",
    port: "production_port",
    password: "production_password",
    database: "production_database",
    ssl: {
      rejectUnauthorized: true, // You should enable SSL for production
    },
  });
} else {
  // Development or other environments
  client = new Client({
    host: host,
    user: user,
    port: port,
    password: password,
    database: database,
  });
}

client.on("connection", (err) => {
  console.error("Postgres connection error", err);
});

client
  .connect()
  .then(() => {
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.log("Postgres connection error", err);
  });

module.exports = client;
