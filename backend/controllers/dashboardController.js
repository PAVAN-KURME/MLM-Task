const Investment = require("../models/Investment");
const ROIHistory = require("../models/ROIHistory");
const LevelIncome = require("../models/LevelIncome");
const User = require("../models/User");

// Return the authenticated user's dashboard statistics and history
exports.getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();

    const totalInvestmentResult = await Investment.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalInvestment = totalInvestmentResult[0]?.totalAmount || 0;
    const investments = await Investment.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    const roiHistory = await ROIHistory.find({ userId: req.user._id })
      .sort({ date: -1 })
      .lean();
    const levelIncome = await LevelIncome.find({ userId: req.user._id })
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      totalInvestment,
      totalROI: user?.totalROI || 0,
      totalLevelIncome: user?.totalLevelIncome || 0,
      walletBalance: user?.walletBalance || 0,
      investments,
      roiHistory,
      levelIncome,
    });
  } catch (error) {
    next(error);
  }
};
