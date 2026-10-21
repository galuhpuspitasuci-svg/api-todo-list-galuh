const ActivityLog = require("../models/activityLog.model");

exports.createLog = async (userId, action, details) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      details,
    });
  } catch (err) {
    console.error("Gagal mencatat activity log:", err);
  }
};