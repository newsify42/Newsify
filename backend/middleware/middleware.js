const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
require("dotenv").config();

const User = require("../models/user.model");

const saltRounds = 10;

function checkValidObjectId(res, id) {
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ObjectID is not valid",
    });
  }
}

function checkCookieExists(req, res, cookieName) {
  if (!(cookieName in req.cookies)) {
    return res.status(404).json({
      message: "Cookie not found",
    });
  }
}

exports.checkUserExists = async (req, res, next) => {
  try {
    checkValidObjectId(res, req.id);

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.checkEmailExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      req.emailExists = true;
      req.user = user;
    }

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    if (!req.emailExists) {
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
    } else {
      return res.status(409).json({
        message: "Email exists",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    if (req.emailExists) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        req.user.password
      );

      if (isMatch) {
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
      } else {
        res.status(401).json({
          message: "Password is incorrect",
        });
      }
    } else {
      return res.status(409).json({
        message: "Email doesn't exist",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.verifyToken = async (req, res, next) => {
  checkCookieExists(req, res, "Authorization");

  const token = req.cookies.Authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.id = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );

    if (isMatch) {
      await User.findByIdAndUpdate({ _id: req.id }, { email: req.body.email });

      res.status(200).json({
        message: "Email updated",
      });
    } else {
      res.status(401).json({
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );

    if (isMatch) {
      const hash = await bcrypt.hash(req.body.newPassword, saltRounds);
      await User.findByIdAndUpdate({ _id: req.id }, { password: hash });

      res.status(200).json({
        message: "Password updated",
      });
    } else {
      res.status(401).json({
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
