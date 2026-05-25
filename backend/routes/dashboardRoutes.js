const express = require("express");
const { getDashboard } = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Return dashboard metrics and history for the authenticated user
router.get("/", protect, getDashboard);

module.exports = router;
