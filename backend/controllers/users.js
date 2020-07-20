const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

saltRounds = "10";

exports.register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      email: req.body.email,
      password: hash,
    });

    const user = await newUser.save();

    res.status(201).json({
      message: "New user created",
      id: user._id,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    await verifyPasswordsMatch(req.body.password, req.user.password, res);

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
      message: "User logged in",
      id: req.user._id,
      token: token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateEmail = async (req, res) => {
  try {
    await verifyPasswordsMatch(req.body.oldPassword, req.user.password, res);

    await User.findByIdAndUpdate({ _id: req.id }, { email: req.body.email });

    res.status(200).json({
      message: "Email updated",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    await verifyPasswordsMatch(req.body.oldPassword, req.user.password, res);

    const hash = await bcrypt.hash(req.body.newPassword, saltRounds);
    await User.findByIdAndUpdate({ _id: req.id }, { password: hash });

    res.status(200).json({
      message: "Password updated",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
