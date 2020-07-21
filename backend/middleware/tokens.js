const asyncHandler = require("express-async-handler");
require("dotenv").config();

const { checkCookieExists } = require("../utils/users");
const validateToken = require("../utils/validate-token");

exports.validateEmailToken = asyncHandler(async (req, res, next) => {
  const payload = await validateToken(
    req.params.token,
    process.env.EMAIL_TOKEN_SECRET
  );

  req.id = payload.id;
  next();
});

exports.validateLoginToken = asyncHandler(async (req, res, next) => {
  checkCookieExists("Authorization", req, res);

  const token = req.cookies.Authorization.split(" ")[1];
  const payload = await validateToken(token, process.env.LOGIN_TOKEN_SECRET);

  req.id = payload.id;
  next();
});
