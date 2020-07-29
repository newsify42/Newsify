const router = require("express").Router();

const {
  checkEmailDoesNotExist,
  findUserByEmail,
  findUserById,
  checkPasswordsMatch,
  isValidEmail,
  isValidPassword
} = require("../middleware/users");

const {
  validateEmailToken,
  validateLoginToken
} = require("../middleware/tokens");

const {
  register,
  login,
  confirmEmail,
  forgetPassword,
  updateEmail,
  updatePassword,
  deleteUser
} = require("../controllers/users");

router.route("/register").post(checkEmailDoesNotExist, register);

router.route("/login").post(findUserByEmail, checkPasswordsMatch, login);

router
  .route("/confirm-email/:emailToken")
  .get(validateEmailToken, findUserById, confirmEmail);

router.route("/forget-password").post(findUserByEmail, forgetPassword);

router
  .route("/reset-password/:emailToken")
  .post(validateEmailToken, updatePassword);

router
  .route("/update-email")
  .patch(
    validateLoginToken,
    findUserById,
    checkPasswordsMatch,
    isValidEmail,
    updateEmail
  );

router
  .route("/update-password")
  .patch(
    validateLoginToken,
    findUserById,
    checkPasswordsMatch,
    isValidPassword,
    updatePassword
  );

router
  .route("/delete-user")
  .delete(validateLoginToken, findUserById, checkPasswordsMatch, deleteUser);

module.exports = router;
