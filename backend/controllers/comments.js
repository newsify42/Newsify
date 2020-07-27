const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");

const Comment = require("../models/comment.model");
const Article = require("../models/article.model");

exports.getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.find({ _id: req.params.id });

  if (!comment.length) {
    throw httpError(400, "Comment Not found");
  }

  res.status(200).json(comment);
});

exports.getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find();

  if (!comments.length) {
    return res.status(200).json({
      message: "No Comments Found",
    });
  }

  res.status(200).json(comments);
});

exports.addComment = asyncHandler(async (req, res) => {
  const newComment = new Comment({
    username: req.username,
    userId: req.userId,
    articleId: req.body.articleId,
    comment: req.body.comment,
  });

  await newComment.save();

  // Need to push the comment's reference to the article
  await Article.findOneAndUpdate(
    { _id: req.body.articleId },
    { $push: { comments: newComment._id } }
  );

  res.status(201).json({
    message: "Comment Created",
    id: newComment._id,
  });
});

exports.updateComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    { comment: req.body.newComment }
  );

  res.status(200).json({
    message: "Comment Updated",
  });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndRemove({ _id: req.params.id });

  res.status(200).json({
    message: "Comment Deleted",
  });
});
