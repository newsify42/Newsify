const router = require("express").Router();

const {
  checkEmailDoesNotExist,
  findUserByEmail,
  findUserById,
  checkPasswordsMatch,
} = require("../middleware/users");

const { validateToken } = require("../middleware/tokens");

const {
  login,
  register,
  updateEmail,
  updatePassword,
  deleteUser,
} = require("../controllers/users");

router.route("/register").post(checkEmailDoesNotExist, register);

router.route("/login").post(findUserByEmail, checkPasswordsMatch, login);

router.route("/logout").post((res) => {
  res.clearCookie("Authorization");
});

router
  .route("/update_email")
  .patch(validateToken, findUserById, checkPasswordsMatch, updateEmail);

router
  .route("/update_password")
  .patch(validateToken, findUserById, checkPasswordsMatch, updatePassword);

router
  .route("/delete_user")
  .delete(validateToken, findUserById, checkPasswordsMatch, deleteUser);

module.exports = router;
