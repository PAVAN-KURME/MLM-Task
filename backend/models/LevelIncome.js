const mongoose = require("mongoose");

const levelIncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    level: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("LevelIncome", levelIncomeSchema);
