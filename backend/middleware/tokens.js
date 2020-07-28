const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");
require("dotenv").config();

const validateToken = require("../utils/validate-token");

exports.validateEmailToken = asyncHandler(async (req, res, next) => {
  let secret;

  if (req.path.startsWith("/confirm_email")) {
    secret = process.env.CONFIRM_EMAIL_TOKEN_SECRET;
  } else if (req.path.startsWith("/reset_password")) {
    secret = process.env.RESET_PASSWORD_TOKEN_SECRET;
  }

  const payload = await validateToken(req.params.emailToken, secret);

  req.userId = payload.userId;
  next();
});

exports.validateLoginToken = asyncHandler(async (req, res, next) => {
  const loginToken = req.headers.authorization;
  if (!loginToken) {
    throw httpError(400, "Token Not Present");
  }

  const payload = await validateToken(
    loginToken,
    process.env.LOGIN_TOKEN_SECRET
  );

  req.userId = payload.userId;
  next();
});
