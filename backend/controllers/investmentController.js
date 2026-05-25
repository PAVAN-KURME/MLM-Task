const Investment = require("../models/Investment");
const { validateInvestment } = require("../utils/validators");

const planROIMap = {
  basic: 1,
  silver: 1.2,
  gold: 1.5,
  platinum: 2,
};

const getDailyROI = (plan) => {
  return planROIMap[plan.toLowerCase()] || planROIMap.basic;
};

// Create a new investment for the authenticated user
exports.createInvestment = async (req, res, next) => {
  try {
    validateInvestment(req.body);

    const { amount, plan, duration } = req.body;
    const dailyROI = getDailyROI(plan);
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(duration));

    const investment = await Investment.create({
      userId: req.user._id,
      amount,
      plan,
      dailyROI,
      startDate,
      endDate,
      status: "active",
    });

    res.status(201).json({
      message: "Investment created successfully",
      investment,
    });
  } catch (error) {
    next(error);
  }
};

// Return investments for the logged-in user sorted newest first
exports.myInvestments = async (req, res, next) => {
  try {
    const investments = await Investment.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      investments,
    });
  } catch (error) {
    next(error);
  }
};
