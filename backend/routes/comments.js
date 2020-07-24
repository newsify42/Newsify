const router = require("express").Router();

const { getAllComments } = require("../controllers/comments");

router.route("/").get((req, res) => {
  res.json({
    message: "Yeah",
  });
});

router.route("/get_all_comments").get(getAllComments);

module.exports = router;
