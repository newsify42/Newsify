const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");

const Article = require("../models/article.model");
const ThreadUsername = require("../models/thread-usernames.model");

exports.getArticle = asyncHandler(async (req, res) => {
  const article = await Article.findOne({ _id: req.params.id }).populate(
    "comments"
  );

  if (!article) {
    throw httpError(400, "Article Not found");
  }

  res.status(200).json(article);
});

exports.getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find();

  if (!articles.length) {
    return res.status(200).json({
      message: "No Article Found",
    });
  }

  res.status(200).json(articles);
});

exports.addArticle = asyncHandler(async (req, res) => {
  const newArticle = new Article({
    userId: req.userId,
    title: req.body.title,
    content: req.body.content,
  });

  await newArticle.save();

  // This adds the original poster's username to the threadUsername table
  const newThreadUsername = new ThreadUsername({
    userId: req.userId,
    articleId: newArticle._id,
    username: newArticle.username,
  });

  await newThreadUsername.save();

  res.status(201).json({
    message: "Article Created",
    id: newArticle._id,
  });
});

exports.updateArticle = asyncHandler(async (req, res) => {
  await Article.findByIdAndUpdate(
    { _id: req.params.id },
    { content: req.body.newContent }
  );

  res.status(200).json({
    message: "Article Updated",
  });
});

exports.deleteArticle = asyncHandler(async (req, res) => {
  await Article.findByIdAndRemove({ _id: req.params.id });

  res.status(200).json({
    message: "Article Deleted",
  });
});
