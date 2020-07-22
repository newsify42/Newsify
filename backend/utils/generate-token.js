const jwt = require("jsonwebtoken");

module.exports = async (payload, secret) => {
  return await jwt.sign(
    payload,
    secret,
    // Token currently expires after 3 hours
    { expiresIn: "3h" }
  );
};
