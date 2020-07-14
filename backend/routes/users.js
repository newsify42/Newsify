const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

const validate = require("../utils/validate");

router.route("/register").post((req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      // Generates the salt and hash for the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          const newUser = new User({
            email: req.body.email,
            password: hash,
          });

          // Creates the new user
          newUser
            .save()
            .then((user) =>
              res.status(201).json({
                status: "success",
                body: "New account created",
              })
            )
            .catch((err) => res.status(500).json(err));
        });
      });
    } else {
      return res.status(409).json({
        status: "info",
        body: "Email already taken",
      });
    }
  });
});

router.route("/login").post((req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // Checks if the hashes of the passwords match
      // Generates and sends a JWT if they match
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          // Token currently expires after 3 hours
          const token = jwt.sign(
            { id: user._id, email: req.body.email },
            process.env.TOKEN_SECRET,
            { expiresIn: "3h" }
          );

          // Store the JWT in a cookie
          res.cookie("Authorization", "Bearer " + token);
          // res.status(200).json({
          //     status: "success",
          //     body: "User logged in",
          // });
          res.status(200).json({
            id: user._id,
            token: token,
          });
        } else {
          return res.status(401).json({
            status: "error",
            body: "Password is incorrect",
          });
        }
      });
    } else {
      return res.status(404).json({
        status: "error",
        body: "Email not found",
      });
    }
  });
});

router.route("/logout").post((req, res) => {
  User.findByIdAndUpdate({});
});

router.route("/updateEmail").put((req, res) => {});

router.route("/updatePassword").put((req, res) => {});

router.route("/deleteUser").delete((req, res) => {
  let token = undefined;

  if (!req.cookies.Authorization) {
    return res.status(401).json({
      status: "error",
      body: "Token not found",
    });
  } else {
    token = req.cookies.Authorization.split(" ")[1];
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    console.log(decoded);
    if (decoded) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        console.log(isMatch);
        if (isMatch) {
          return;
        } else {
          return res.status(401).json({
            status: "error",
            body: "Password is incorrect",
          });
        }
      });
    } else {
      return res.status(401).json({
        status: "error",
        body: "Token is invalid or has expired",
      });
    }
  });
});

module.exports = router;
