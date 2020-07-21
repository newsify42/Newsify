const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user.model");
const emailTemplate = require("../templates/confirm-email");
const generateToken = require("../utils/generate-token");
const sendMail = require("../utils/send-mail");

const saltRounds = 10;

exports.register = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const emailToken = await generateToken(
    { email: email },
    process.env.EMAIL_TOKEN_SECRET
  );

  await sendMail(email, "Confirm Email", emailTemplate(email, emailToken));

  const hash = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    email: email,
    password: hash,
  });

  const user = await newUser.save();

  res.status(201).json({
    message: "New User Created",
    id: user._id,
    email_token: emailToken,
  });
});

exports.login = asyncHandler(async (req, res) => {
  if (!req.user.emailConfirmed) {
    throw httpError(403, "Confirm Email");
  }

  const loginToken = await generateToken(
    { id: req.user._id },
    process.env.LOGIN_TOKEN_SECRET
  );

  console.log(token);

  // Store the JWT in a cookie
  res.cookie("Authorization", "Bearer " + token);
  // Also return it with the message (for now)
  res.status(200).json({
    message: "User Logged In",
    id: req.user._id,
    login_token: loginToken,
  });
});

exports.confirmEmail = asyncHandler(async (req, res) => {});

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
