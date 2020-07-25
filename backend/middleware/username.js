const asyncHandler = require("express-async-handler");
require("dotenv").config();
let rug = require("random-username-generator");

const threadUsername = require("../models/thread_usernames.model");

exports.getUsername = asyncHandler(async (req, res, next) => {
  let user_id = req.body.user_id;
  let article_id = req.article_id;

  let username = await threadUsername.find({
    user_id: user_id,
    article_id: article_id
  });
  if (username) {
    req.body.username = username;
  } else {
    let new_username = rug.generate();
    let username = await threadUsername.save({
      user_id: user_id,
      article_id: article_id,
      username: new_username
    });
    req.username = username;
  }
  next();
});
