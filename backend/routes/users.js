const router = require("express").Router();

const {
  checkEmailDoesNotExist,
  findUserByEmail,
  findUserById,
  checkPasswordsMatch,
} = require("../middleware/users");

const {
  validateEmailToken,
  validateLoginToken,
} = require("../middleware/tokens");

const {
  register,
  login,
  confirmEmail,
  forgetPassword,
  updateEmail,
  updatePassword,
  deleteUser,
} = require("../controllers/users");

router.route("/register").post(checkEmailDoesNotExist, register);

router.route("/login").post(findUserByEmail, checkPasswordsMatch, login);

router.route("/logout").post((req, res) => {
  res.clearCookie("Authorization");
});

router
  .route("/confirm_email/:emailToken")
  .get(validateEmailToken, findUserById, confirmEmail);

router.route("/forget_password").post(findUserByEmail, forgetPassword);

router
  .route("/reset_password/:emailToken")
  .post(validateEmailToken, updatePassword);

router
  .route("/update_email")
  .patch(validateLoginToken, findUserById, checkPasswordsMatch, updateEmail);

router
  .route("/update_password")
  .patch(validateLoginToken, findUserById, checkPasswordsMatch, updatePassword);

router
  .route("/delete_user")
  .delete(validateLoginToken, findUserById, checkPasswordsMatch, deleteUser);

module.exports = router;
