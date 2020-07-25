const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const httpError = require("http-errors");
require("dotenv").config();

const User = require("../models/user.model");
const confirmEmailTemplate = require("../templates/confirm-email");
const resetPasswordTemplate = require("../templates/reset-password");
const generateToken = require("../utils/generate-token");
const sendMail = require("../utils/send-mail");

const saltRounds = 10;

exports.register = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const hash = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    email: email,
    password: hash,
  });

  await newUser.save();

  // Token used to confirm the email
  const confirmEmailToken = await generateToken(
    { id: newUser._id },
    process.env.CONFIRM_EMAIL_TOKEN_SECRET
  );

  // Sending the confirmation email
  await sendMail(
    email,
    "Welcome to Newsify",
    confirmEmailTemplate(email, confirmEmailToken)
  );

  res.status(201).json({
    message: "New User Created",
    id: user._id,
    email_token: confirmEmailToken,
  });
});

exports.login = asyncHandler(async (req, res) => {
  if (!req.user.emailConfirmed) {
    throw httpError(403, "Confirm Email Address");
  }

  // Token used to login
  const loginToken = await generateToken(
    { id: req.user._id },
    process.env.LOGIN_TOKEN_SECRET
  );

  // Store the JWT in a cookie
  res.cookie("Authorization", "Bearer " + loginToken);
  // Also return it with the message (for now)
  res.status(200).json({
    message: "User Logged In",
    id: req.user._id,
    loginToken: loginToken,
  });
});

exports.confirmEmail = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate({ _id: req.id }, { emailConfirmed: true });

  res.status(200).json({
    message: "Email Confirmed",
  });
});

exports.forgetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = await generateToken(
    { id: req.user._id },
    process.env.RESET_PASSWORD_TOKEN_SECRET
  );

  await sendMail(
    req.body.email,
    "Password Reset",
    resetPasswordTemplate(req.body.email, resetPasswordToken)
  );

  res.status(200).json({
    message: "Password Reset Email Sent",
    resetToken: resetPasswordToken,
  });
});

exports.updateEmail = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate({ _id: req.id }, { email: req.body.newEmail });

  res.status(200).json({
    message: "Email Updated",
  });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const hash = await bcrypt.hash(req.body.newPassword, saltRounds);
  await User.findByIdAndUpdate({ _id: req.id }, { password: hash });

  res.status(200).json({
    message: "Password Updated",
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await User.deleteOne({ _id: userId });

  res.status(200).json({
    message: "User Deleted",
  });
});
