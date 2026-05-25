const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const referralRoutes = require("./routes/referralRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { startRoiCron } = require("./cron/roiCron");

const app = express();
const port = process.env.PORT || 5000;

// Ensure required environment variables are present
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("MONGO_URI and JWT_SECRET must be defined in .env");
  process.exit(1);
}

// Database Connection
connectDB();

// Middlewares
app.disable("x-powered-by");
const corsOptions = {
  origin: process.env.CORS_ORIGIN || true,
};
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/referrals", referralRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Global error handler
app.use(errorHandler);

// Server Listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  startRoiCron();
});
