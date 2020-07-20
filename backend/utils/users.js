const httpError = require("http-errors");
const ObjectId = require("mongoose").Types.ObjectId;

exports.validateObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw httpError(400, "ObjectID Not Valid");
  }
};

exports.checkCookieExists = (cookieName, req) => {
  if (!(cookieName in req.cookies)) {
    throw httpError(400, "Cookie Not Found");
  }
};
