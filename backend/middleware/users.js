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
  validateObjectId(req.userId);
  const user = await User.findOne({ _id: req.userId });

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

exports.isValidEmail = asyncHandler(async (req, res, next) => {
  const { newEmail } = req.body;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let email = newEmail.match(emailRegex);

  if (!email) {
    throw httpError(401, "Not a valid Email");
  }
  next();
});

exports.isValidPassword = asyncHandler(async (req, res, next) => {
  const { newPassword } = req.body;

  if (newPassword.length < 5) {
    throw httpError(401, "Password must be at least 5 characters long");
  }
  next();
});
