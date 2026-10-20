const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  // Cegah double connection saat Jest running!
  if (process.env.NODE_ENV === "test") return;

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI tidak ditemukan");

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;