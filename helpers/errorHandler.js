const responseHelper = require('./response');

module.exports = (err, req, res, next) => {
  let error = {
    code: 500,
    message: "Internal server error",
  };

  switch (err.name) {
    case "NOT_FOUND":
      error = {
        code: 404,
        message: err.message || "Not found",
      };
      break;
    case "BAD_REQUEST":
      error = {
        code: 400,
        message: err.message || "Bad request",
      };
      break;
    default:
  }
  const response = responseHelper.error(null, error.message, error.code);
  res.status(response.code).json(response);
};