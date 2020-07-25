const router = require("express").Router();

const {
  getComment,
  getAllComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const { validateLoginToken } = require("../middleware/tokens");

router.route("/").get(getAllComments).post(validateLoginToken, addComment);

router
  .route("/:id")
  .get(getComment)
  .patch(validateLoginToken, updateComment)
  .delete(validateLoginToken, deleteComment);

module.exports = router;
