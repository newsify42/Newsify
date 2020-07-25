const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const httpError = require("http-errors");
require("dotenv").config();

const threadUsername = require("../models/thread_usernames.model");

exports.getUsername = asyncHandler(async (req, res) => {
  let user_id = req.body.user_id;
  let article_id = req.body.article_id;

  let username = await threadUsername.find({
    user_id: user_id,
    article_id: article_id
  });
  res.status(200).json({
    username: username.username
  });
});
