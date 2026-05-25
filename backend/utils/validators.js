// Validate required fields for user registration
exports.validateRegister = (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    const error = new Error("Name, email and password are required");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters long");
    error.statusCode = 400;
    throw error;
  }
};

// Validate login request payload
exports.validateLogin = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }
};

// Validate investment request payload
exports.validateInvestment = (data) => {
  const { amount, plan, duration } = data;

  if (!amount || !plan || !duration) {
    const error = new Error("Amount, plan and duration are required for investment");
    error.statusCode = 400;
    throw error;
  }

  if (Number(amount) <= 0) {
    const error = new Error("Investment amount must be greater than zero");
    error.statusCode = 400;
    throw error;
  }

  if (Number(duration) <= 0) {
    const error = new Error("Investment duration must be greater than zero days");
    error.statusCode = 400;
    throw error;
  }
};
