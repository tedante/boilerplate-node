const responseHelper = require('./response');

module.exports = (err, req, res, next) => {
  let error = {
    code: 500,
    message: "Internal server error",
    errors: {},
  };

  switch (err.name) {
    case "NOT_FOUND":
      error = {
        code: 404,
        message: err.message || "Not found",
        errors: {},
      };
      break;
    case "BAD_REQUEST":
      error = {
        code: 400,
        message: err.message || "Bad request",
        errors: err.errors || {},
      };
      break;
    case "NOT_AUTHORIZED":
      error = {
        code: 401,
        message: err.message || "You are not authorized",
        errors: err.errors || {},
      };
      break;
    case "FORBIDDEN":
      error = {
        code: 403,
        message: err.message || "Forbidden",
        errors: err.errors || {},
      };
      break;
    default:
  }
  
  const response = responseHelper.error(null, error.message, error.code);
  res.status(response.code).json(response);
};