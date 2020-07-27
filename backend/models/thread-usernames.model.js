const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadUsernameSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  articleId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "Article",
  },
  username: { type: String, required: true, unique: false },
});

const ThreadUsername = mongoose.model("threadUsername", ThreadUsernameSchema);

module.exports = ThreadUsername;
