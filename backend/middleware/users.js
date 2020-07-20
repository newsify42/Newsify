const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");

const User = require("../models/user.model");
const { validateObjectId } = require("../utils/users");

exports.checkEmailDoesNotExist = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw httpError(409, "Email Found");
  }

  next();
});

exports.findUserByEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw httpError(400, "User Not Found");
  }

  req.user = user;
  next();
});

exports.findUserById = asyncHandler(async (req, res, next) => {
  validateObjectId(req.id, res);

  const user = await User.findById(req.id);
  if (!user) {
    throw httpError(400, "User Not Found");
  }

  req.user = user;
  next();
});
