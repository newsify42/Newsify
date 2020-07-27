const asyncHandler = require("express-async-handler");
require("dotenv").config();
let rug = require("random-username-generator");

const ThreadUsername = require("../models/thread-usernames.model");

exports.getUsername = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const articleId = req.body.articleId;

  let username = await ThreadUsername.findOne({
    userId: userId,
    articleId: articleId,
  });

  if (username) {
    req.username = username.username;
  } else {
    const newUsername = rug.generate();

    username = new ThreadUsername({
      userId: userId,
      articleId: articleId,
      username: newUsername,
    });

    await username.save();

    req.username = newUsername;
  }
  next();
});
