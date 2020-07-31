const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");

const Article = require("../models/article.model");
const ThreadUsername = require("../models/thread-usernames.model");
const Report = require("../models/report.model");
const LikedArticle = require("../models/liked-articles.model");
const { findOne } = require("../models/article.model");

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
    category: req.body.category,
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
  await Article.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.newContent }
  );

  res.status(200).json({
    message: "Article Updated",
  });
});

exports.deleteArticle = asyncHandler(async (req, res) => {
  await Article.findOneAndRemove({ _id: req.params.id });

  res.status(200).json({
    message: "Article Deleted",
  });
});

exports.reportArticle = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const articleId = req.body.articleId;
  const offense = req.body.offense;
  const content = req.body.content;

  if (!Article.findById({ _id: articleId }).length) {
    res.status(200).json({
      message: "Could not find Article",
    });
  } else {
    const newReport = new Report({
      userId: userId,
      reportedId: articleId,
      offense: offense,
      content: content,
    });
    await newReport.save();

    if (
      await Article.findOneAndUpdate(
        { _id: req.body.articleId },
        { $push: { reports: newReport._id } }
      )
    ) {
      res.status(200).json({
        message: "Report added",
      });
    } else {
      res.status(200).json({
        message: "Could not send report",
      });
    }
  }
});

exports.voteArticle = asyncHandler(async (req, res) => {
  const likedArticle = await LikedArticle.findOne({
    userId: req.userId,
    articleId: req.body.articleId,
  });

  //If user has already voted, it either deletes previous vote or swaps it
  if (likedArticle) {
    if (
      (likedArticle.liked == 1 && req.body.vote == 1) ||
      (likedArticle.liked == 0 && req.body.vote == -1)
    ) {
      //deletes user/article/like object associated between post and user
      await LikedArticle.findByIdAndDelete({ _id: likedArticle._id });

      //Takes away the vote from the article
      if (req.body.vote == 1) {
        await Article.findOneAndUpdate(
          { _id: req.body.articleId },
          { $inc: { upvotes: -1 } }
        );
        res.status(200).json({
          message: "upvote successfully revoked",
        });
      } else if (req.body.vote == -1) {
        await Article.findOneAndUpdate(
          { _id: req.body.articleId },
          { $inc: { downvotes: -1 } }
        );
        res.status(200).json({
          message: "downvote successfully revoked",
        });
      }
    }
    //Swaps the "liked" boolean to the opposite value
    else if (
      (likedArticle.liked == 1 && req.body.vote == -1) ||
      (likedArticle.liked == 0 && req.body.vote == 1)
    ) {
      var swap = new Boolean(likedArticle.liked != true);

      await LikedArticle.findOneAndUpdate(
        {
          userId: req.userId,
          articleId: req.body.articleId,
        },
        { liked: swap }
      );
      res.status(200).json({
        message: "Vote successfully swapped",
      });
    }
  }

  //If user had no previous voting history
  else {
    if (req.body.vote == -1) {
      await Article.findOneAndUpdate(
        { _id: req.body.articleId },
        { $inc: { downvotes: 1 } }
      );

      const newLikedArticle = new LikedArticle({
        userId: req.userId,
        articleId: req.body.articleId,
        liked: 0,
      });
      await newLikedArticle.save();
      res.status(200).json({
        message: "downvote successful",
      });
    } else {
      if (req.body.vote == 1) {
        await Article.findOneAndUpdate(
          { _id: req.body.articleId },
          { $inc: { upvotes: 1 } }
        );

        const newLikedArticle = new LikedArticle({
          userId: req.userId,
          articleId: req.body.articleId,
          liked: 1,
        });
        await newLikedArticle.save();

        res.status(200).json({
          message: "upvote successful",
        });
      }
    }
  }
});
