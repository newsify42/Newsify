const router = require("express").Router();

const {
  getArticle,
  getAllArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  voteArticle,
  reportArticle,
  getLikedArticles,
} = require("../controllers/articles");

const { validateLoginToken } = require("../middleware/tokens");

router.route("/likedArticles").get(validateLoginToken, getLikedArticles);
router.route("/like").patch(validateLoginToken, voteArticle);
router.route("/report").post(validateLoginToken, reportArticle);

router.route("/").get(getAllArticles).post(validateLoginToken, addArticle);

router
  .route("/:id")
  .get(getArticle)
  .patch(validateLoginToken, updateArticle)
  .delete(validateLoginToken, deleteArticle);

module.exports = router;
