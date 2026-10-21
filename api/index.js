require("dotenv").config();
const app = require("../src/app");
const connectDB = require("../src/config/db");

connectDB().catch((err) => console.error(err.message));

module.exports = app;