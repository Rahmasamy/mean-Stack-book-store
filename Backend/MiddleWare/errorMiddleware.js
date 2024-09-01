const ApiError = require("../Utils/apiError");

const sendErrorForDev = (err, res) => {
  // Respond with detailed error information
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProduction = (err, res) => {
  // Respond with a generic error message
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleJsonWebTokenError = () =>
  new ApiError("Invalid token, please login again", 401);

const handleTokenExpiredError = () =>
  new ApiError("Token Expiration , please login again", 401);

const globalErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status ? "error" : "fill";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "JsonWebTokenError") err = handleJsonWebTokenError();
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError();
    sendErrorForProduction(err, res);
  }
};

module.exports = globalErrors;
