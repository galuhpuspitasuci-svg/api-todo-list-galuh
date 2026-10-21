const express = require("express");
const ActivityLog = require("../models/activityLog.model");
const { protect } = require("../middlewares/auth.middleware");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.use(protect);

router.get("/", catchAsync(async (req, res, next) => {
  const logs = await ActivityLog.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json({
    status: "success",
    results: logs.length,
    data: { logs },
  });
}));

module.exports = router;