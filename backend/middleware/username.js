const asyncHandler = require("express-async-handler");
require("dotenv").config();
let rug = require("random-username-generator");

const threadUsername = require("../models/thread_usernames.model");

exports.getUsername = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  const articleId = req.articleId;

  let username = await threadUsername.find({
    userId: userId,
    articleId: articleId
  });
  if (username) {
    req.body.username = username;
  } else {
    const newUsername = rug.generate();
    const username = await threadUsername.save({
      user_id: user_id,
      article_id: article_id,
      username: newUsername
    });
    req.username = username;
  }
  next();
});
