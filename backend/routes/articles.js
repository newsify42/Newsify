const router = require("express").Router();

const {
  getArticle,
  getAllArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");

const { validateLoginToken } = require("../middleware/tokens");

router.route("/").get(getAllArticles).post(validateLoginToken, addArticle);

router
  .route("/:id")
  .get(getArticle)
  .patch(validateLoginToken, updateArticle)
  .delete(validateLoginToken, deleteArticle);

module.exports = router;
