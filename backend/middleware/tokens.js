const asyncHandler = require("express-async-handler");
require("dotenv").config();

const { checkCookieExists } = require("../utils/users");
const validateToken = require("../utils/validate-token");

exports.validateEmailToken = asyncHandler(async (req, res, next) => {
  let secret;

  if (req.path.startsWith("/confirm_email")) {
    secret = process.env.CONFIRM_EMAIL_TOKEN_SECRET;
  } else if (req.path.startsWith("/reset_password")) {
    secret = process.env.RESET_PASSWORD_TOKEN_SECRET;
  }

  const payload = await validateToken(req.params.token, secret);

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
