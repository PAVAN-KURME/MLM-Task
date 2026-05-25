const User = require("../models/User");

const buildReferralTree = async (userId) => {
  const referrals = await User.find({ referredBy: userId })
    .select("name email referralCode createdAt updatedAt")
    .lean();

  return Promise.all(
    referrals.map(async (referral) => ({
      ...referral,
      referrals: await buildReferralTree(referral._id),
    })),
  );
};

// Return the referral tree for the authenticated user
exports.getReferralTree = async (req, res, next) => {
  try {
    const tree = await buildReferralTree(req.user._id);
    res.status(200).json({
      tree,
    });
  } catch (error) {
    next(error);
  }
};
