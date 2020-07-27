const router = require("express").Router();
let Article = require("../models/article.model");
let Report = require("../models/report.model");
//let Comment = require('../models/comment.model');

router.route("/").get((req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get").get((req, res) => {
  const articleId = req.body.articleId;
  //Get singular article by id
  Article.findById(articleId)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const articleTitle = req.body.title;
  const articlebody = req.body.content;
  const summary = req.body.summary;
  const likes = 0;

  const newArticle = new Article({
    username: username,
    title: articleTitle,
    content: articlebody,
    summary: summary,
    likes: likes,
  });

  newArticle
    .save()
    .then(() => res.json("Article added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete").delete((req, res) => {
  const articleId = req.body.id;
  //Gets the articleId from whatever article has been selected
  Article.deleteOne(articleId)
    .then(() => res.json("Article deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/report").post((req, res) => {
  const username = req.body.username;
  const articleId = req.body.articleId;
  const offense = req.body.offense;
  const content = req.body.content;

  const newReport = new Report({
    username: username,
    reortedID: articleId,
    offense: offense,
    content: content,
  });

  newReport
    .save()
    .then(() => res.json("Report added!"))
    .catch((err) => res.status(400).json("Error: " + err));

  //Article.findById(articleId).
  //Still need to add the report object to an array in the article object
});

module.exports = router;
