// Handle any uncaught errors and return a consistent HTTP response
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error";

  console.error(err);

  res.status(statusCode).json({
    message,
  });
}

module.exports = errorHandler;
