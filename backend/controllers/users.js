const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");
const sendMail = require("../utils/send-mail");

const saltRounds = 10;

exports.register = asyncHandler(async (req, res) => {
  await sendMail(req.body.email);

  const hash = await bcrypt.hash(req.body.password, saltRounds);

  const newUser = new User({
    email: req.body.email,
    password: hash,
  });

  //const user = await newUser.save();

  res.status(201).json({
    message: "New User Created",
    //id: user._id,
  });
});

exports.login = asyncHandler(async (req, res) => {
  // Creates the JWT
  const token = await jwt.sign(
    {
      id: req.user._id,
    },
    process.env.TOKEN_SECRET,
    // Token currently expires after 3 hours
    { expiresIn: "3h" }
  );

  // Store the JWT in a cookie
  res.cookie("Authorization", "Bearer " + token);
  // Also return it with the message (for now)
  res.status(200).json({
    message: "User Logged In",
    id: req.user._id,
    token: token,
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
