const httpError = require("http-errors");
const ObjectId = require("mongoose").Types.ObjectId;

exports.validateObjectId = id => {
  if (!ObjectId.isValid(id)) {
    throw httpError(400, "ObjectID Not Valid");
  }
};
