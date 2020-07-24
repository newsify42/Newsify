const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");

const Comment = require("../models/comment.model");

exports.getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find();

  if (!comments.length) {
    return res.status(200).json({
      message: "No Comments Found",
    });
  }

  res.status(200).json(comments);
});
