//const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");
//const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
//const { validateObjectId } = require("../utils/users");

//Validates comments fields
exports.validateComment = asyncHandler(async (req, res, next) => {});

//Validates user to allow editing/deleting comments
exports.validateUser = asyncHandler(async (req, res, next) => {});
