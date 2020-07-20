const router = require("express").Router();

const {
  verifyEmailDoesNotExist,
  verifyUserExistsByEmail,
  verifyUserExistsById,
} = require("../middleware/users");

const { validateToken } = require("../middleware/tokens");

const {
  login,
  register,
  updateEmail,
  updatePassword,
} = require("../controllers/users");

router.route("/register").post(verifyEmailDoesNotExist, register);

router.route("/login").post(verifyUserExistsByEmail, login);

router.route("/logout").post((res) => {
  res.clearCookie("Authorization");
});

router
  .route("/update_email")
  .patch(validateToken, verifyUserExistsById, updateEmail);

router
  .route("/update_password")
  .patch(validateToken, verifyUserExistsById, updatePassword);

router.route("/:userId").delete(validateToken, (req, res) => {
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
