const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = (req, res, next) => {
  // Checks if the cookie exists
  if (!("Authorization" in req.cookies)) {
    return res.status(404).json({
      message: "Cookie not found",
    });
  }

  const token = req.cookies.Authorization.split(" ")[1];

  // Verifies that the JWT is valid
  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) return res.status(401).json(err);

    next();
  });
};
