const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadUsernameSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  articleId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  username: {
    type: String,
    required: true,
  },
});

const ThreadUsername = mongoose.model("ThreadUsername", threadUsernameSchema);

module.exports = ThreadUsername;
