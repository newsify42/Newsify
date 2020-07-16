const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
require("dotenv").config();

const User = require("../models/user.model");
const checkAuth = require("../middleware/check-auth");

router.route("/register").post((req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      // Generates the salt and hash for the password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json(err);

        const newUser = new User({
          email: req.body.email,
          password: hash,
        });

        // Creates the new user
        newUser
          .save()
          .then((user) =>
            res.status(201).json({
              message: "New user created",
              id: user._id,
            })
          )
          .catch((err) => res.status(500).json(err));
      });
    })
    .catch((err) => res.status(500).json(err));
});

router.route("/login").post((req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "Email not found",
        });
      }

      // Checks if the hashes of the passwords match
      // Generates and sends a JWT if they match
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json(err);

        if (isMatch) {
          const token = jwt.sign(
            {
              id: user._id,
              email: req.body.email,
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
            id: user._id,
            token: token,
          });
        } else {
          res.status(401).json({
            message: "Password is incorrect",
          });
        }
      });
    })
    .catch((err) => res.status(500).json(err));
});

router.route("/logout").post((req, res) => {
  res.clearCookie("Authorization");
});

router.route("/:userId").patch(checkAuth, (req, res) => {
  const userId = req.params.userId;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "ObjectID is not valid",
    });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      bcrypt.compare(req.body.oldPassword, user.password, (err, isMatch) => {
        if (err) return res.status(500).json(err);

        if (isMatch) {
          if (req.body.email) {
            User.updateOne({ _id: userId }, { email: req.body.email })
              .then(() => {
                res.status(200).json({
                  message: "Email updated",
                });
              })
              .catch((err) => res.status(500).json(err));
          } else if (req.body.newPassword) {
            User.updateOne({ _id: userId }, { email: req.body.password })
              .then(() => {
                res.status(200).json({
                  message: "Password updated",
                });
              })
              .catch((err) => res.status(500).json(err));
          } else {
            res.status(400).json({
              message: "Parameters not provided",
            });
          }
        } else {
          res.status(401).json({
            message: "Password is incorrect",
          });
        }
      });
    })
    .catch((err) => res.status(500).json(err));
});

router.route("/:userId").delete(checkAuth, (req, res) => {
  const userId = req.params.userId;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "ObjectID is not valid",
    });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json(err);

        if (isMatch) {
          User.deleteOne({ _id: userId })
            .then(() => {
              res.status(200).json({
                message: "User is deleted",
              });
            })
            .catch((err) => res.status(500).json(err));
        } else {
          res.status(401).json({
            message: "Password is incorrect",
          });
        }
      });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
