const cron = require("node-cron");
const { calculateDailyROI } = require("../services/roiService");

// Start the daily ROI cron job at midnight UTC
const startRoiCron = () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        await calculateDailyROI();
        console.log("Daily ROI cron job completed");
      } catch (error) {
        console.error("Daily ROI cron job failed:", error.message);
      }
    },
    {
      timezone: "UTC",
    },
  );
};

module.exports = { startRoiCron };
