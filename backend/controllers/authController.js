const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegister, validateLogin } = require("../utils/validators");

// Generate a random short referral code
const generateReferralCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// Generate a unique referral code that does not already exist in the database
const getUniqueReferralCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = generateReferralCode();
    exists = await User.exists({ referralCode: code });
  }

  return code;
};

// Register user with hashed password and optional referral link
exports.register = async (req, res, next) => {
  try {
    validateRegister(req.body);

    const { name, email, password, referralCode } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let referredBy = null;

    if (referralCode) {
      const refUser = await User.findOne({ referralCode });
      if (refUser) {
        referredBy = refUser._id;
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      referralCode: await getUniqueReferralCode(),
      referredBy,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

// Authenticate user and return JWT without exposing the password
exports.login = async (req, res, next) => {
  try {
    validateLogin(req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      token,
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};
