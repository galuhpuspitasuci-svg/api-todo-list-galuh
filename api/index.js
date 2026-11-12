require("dotenv").config();
const app = require("../src/app");
const connectDB = require("../src/config/db");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    return res.status(500).json({ success: false, message: "DB error: " + err.message });
  }
  return app(req, res);
};