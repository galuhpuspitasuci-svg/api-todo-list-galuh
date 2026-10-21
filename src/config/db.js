const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

async function connectDB() {
  if (process.env.NODE_ENV === "test") return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI tidak ditemukan");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => {
      console.log("MongoDB connected successfully");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
  return cached.conn;
}

module.exports = connectDB;