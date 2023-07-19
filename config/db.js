const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "123",
  database: "my-social-space",
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
