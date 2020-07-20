const asyncHandler = require("express-async-handler");
const httpError = require("http-errors");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

exports.validateObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw httpError(400, "ObjectID is not valid");
  }
};

exports.checkCookieExists = (cookieName, req) => {
  if (!(cookieName in req.cookies)) {
    throw httpError(400, "Cookie not found");
  }
};

exports.checkPasswordsMatch = asyncHandler(async (pass1, pass2) => {
  const isMatch = await bcrypt.compare(pass1, pass2);

  if (!isMatch) {
    throw httpError(401, "Password is incorrect");
  }
});
