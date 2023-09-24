const { Client } = require("pg");
const { host, user, port, password, database } = require("../utils/config");

const client = new Client({
  host: host,
  user: user,
  port: port,
  password: password,
  database: database,
});

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
