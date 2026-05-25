const express = require("express");
const { createInvestment, myInvestments } = require("../controllers/investmentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new investment for the authenticated user
router.post("/create", protect, createInvestment);

// Get investments belonging to the authenticated user
router.get("/my-investments", protect, myInvestments);

module.exports = router;
