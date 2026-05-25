const express = require("express");

// Create auth router for registration and login
const router = express.Router();

const { register, login } = require("../controllers/authController");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

module.exports = router;
