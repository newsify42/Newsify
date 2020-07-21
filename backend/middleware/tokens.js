const jwt = require("jsonwebtoken");

const { checkCookieExists } = require("../utils/users");

exports.validateToken = async (req, res, next) => {
  checkCookieExists("Authorization", req, res);

  const token = req.cookies.Authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.id = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json(err);
  }
};
