const asyncHandler = require("express-async-handler");
require("dotenv").config();
let rug = require("random-username-generator");

const threadUsername = require("../models/thread_usernames.model");

exports.getUsername = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  const articleId = req.body.articleId;

  let username = await threadUsername.findOne({
    userId: userId,
    articleId: articleId,
  });

  if (username) {
    req.username = username.username;
  } else {
    const newUsername = rug.generate();

    username = new threadUsername({
      userId: userId,
      articleId: articleId,
      username: newUsername,
    });

    await username.save();

    req.username = newUsername;
  }
  next();
});
