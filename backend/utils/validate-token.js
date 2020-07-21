const httpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = async (token, secret) => {
  try {
    return await jwt.verify(token, secret);
  } catch (err) {
    throw httpError(403, "Confirm Email");
  }
};
