const bcrypt = require("bcrypt");
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
  validateObjectId(req.id);
  const user = await User.findById(req.id);

  if (!user) {
    throw httpError(400, "User Not Found");
  }

  req.user = user;
  next();
});

exports.checkPasswordsMatch = asyncHandler(async (req, res, next) => {
  const isMatch = await bcrypt.compare(req.body.password, req.user.password);

  if (!isMatch) {
    throw httpError(401, "Password Incorrect");
  }

  next();
});
