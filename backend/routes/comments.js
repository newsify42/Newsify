const router = require("express").Router();

const {
  getComment,
  getAllComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

router.route("/get_comment/:id").get(getComment);

router.route("/get_all_comments").get(getAllComments);

router.route("/add_comment").post(addComment);

router.route("/update_comment").patch(updateComment);

router.route("/delete_comment").delete(deleteComment);

module.exports = router;
