const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");
const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log("Admin already exists");
      process.exit();
    }
    const hashedPassword = await bcrypt.hash("123456", 10);
    const user = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      referralCode: "ADMIN01",
      walletBalance: 0,
      totalROI: 0,
      totalLevelIncome: 0,
    });
    console.log("Admin Created Successfully");
    console.log(user);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
createAdmin();
