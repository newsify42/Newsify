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

// router.route("/report").post((req, res) => {
//   const username = req.body.username;
//   const articleId = req.body.articleId;
//   const offense = req.body.offense;
//   const content = req.body.content;

//   const newReport = new Report({
//     username: username,
//     reortedID: articleId,
//     offense: offense,
//     content: content,
//   });

//   newReport
//     .save()
//     .then(() => res.json("Report added!"))
//     .catch((err) => res.status(400).json("Error: " + err));

//   //Article.findById(articleId).
//   //Still need to add the report object to an array in the article object
// });

module.exports = router;
