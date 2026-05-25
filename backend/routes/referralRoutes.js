const express = require("express");
const { getReferralTree } = require("../controllers/referralController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Return the nested referral tree for the authenticated user
router.get("/tree", protect, getReferralTree);

module.exports = router;
