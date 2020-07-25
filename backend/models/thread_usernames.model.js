const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadUsernameSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User"
  },
  articleId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "Post"
  },
  username: { type: String, required: true, unique: false }
});

const threadUsername = mongoose.model("threadUsername", threadUsernameSchema);

module.exports = threadUsername;
