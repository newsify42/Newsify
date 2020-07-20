const jwt = require("jsonwebtoken");

exports.validateToken = async (req, res, next) => {
  verifyCookieExists("Authorization", req, res);

  const token = req.cookies.Authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.id = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};
