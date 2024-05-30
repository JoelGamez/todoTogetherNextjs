// src/config/config.js
require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  // Add similar configurations for test and production environments if needed
};
