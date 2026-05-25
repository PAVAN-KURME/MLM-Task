const Investment = require("../models/Investment");
const ROIHistory = require("../models/ROIHistory");
const LevelIncome = require("../models/LevelIncome");
const User = require("../models/User");

const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Distribute referral income up the referral chain for 3 levels
exports.distributeLevelIncome = async (userId, roiAmount, date) => {
  const commissionRates = [0.1, 0.05, 0.02];
  let currentUser = await User.findById(userId).lean();

  for (let level = 1; level <= commissionRates.length; level += 1) {
    if (!currentUser?.referredBy) {
      break;
    }

    const parentUser = await User.findById(currentUser.referredBy);
    if (!parentUser) {
      break;
    }

    const amount = Number((roiAmount * commissionRates[level - 1]).toFixed(2));

    await LevelIncome.create({
      userId: parentUser._id,
      fromUser: userId,
      level,
      amount,
      date,
    });

    await User.findByIdAndUpdate(parentUser._id, {
      $inc: {
        walletBalance: amount,
        totalLevelIncome: amount,
      },
    });

    currentUser = parentUser;
  }
};

// Calculate daily ROI for active investments and update history and balances
exports.calculateDailyROI = async () => {
  const today = normalizeDate(new Date());

  const activeInvestments = await Investment.find({
    status: "active",
    endDate: { $gte: today },
  }).lean();

  for (const investment of activeInvestments) {
    const alreadyProcessed = await ROIHistory.exists({
      investmentId: investment._id,
      date: today,
    });

    if (alreadyProcessed) {
      continue;
    }

    const roiAmount = Number(((investment.amount * investment.dailyROI) / 100).toFixed(2));

    await ROIHistory.create({
      userId: investment.userId,
      investmentId: investment._id,
      roiAmount,
      date: today,
    });

    await User.findByIdAndUpdate(investment.userId, {
      $inc: {
        walletBalance: roiAmount,
        totalROI: roiAmount,
      },
    });

    await exports.distributeLevelIncome(investment.userId, roiAmount, today);

    if (new Date(investment.endDate) < today) {
      await Investment.findByIdAndUpdate(investment._id, { status: "completed" });
    }
  }
};
