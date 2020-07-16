const mongoose = require("mongoose");
//const Comments = require("Comment");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username: { type: String, required: true, unique: false },
    content: String,
    likes: Number,
    // comments: Array
  },

  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Post;
