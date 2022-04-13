const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORS,
    database: "pick_me_up",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORS,
    database: "pick_me_up",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
};

module.exports = config;
