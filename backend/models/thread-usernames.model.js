const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadUsernameSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "Post",
  },
  username: { type: String, required: true, unique: false },
});

const ThreadUsername = mongoose.model("threadUsername", ThreadUsernameSchema);

module.exports = ThreadUsername;
