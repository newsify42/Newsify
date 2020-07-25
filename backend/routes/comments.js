const router = require("express").Router();

const {
  getComment,
  getAllComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const { validateLoginToken } = require("../middleware/tokens");
const { getUsername } = require("../middleware/username");

router
  .route("/")
  .get(getAllComments)
  .post(validateLoginToken, getUsername, addComment);

router
  .route("/:id")
  .get(getComment)
  .patch(validateLoginToken, updateComment)
  .delete(validateLoginToken, deleteComment);

module.exports = router;
