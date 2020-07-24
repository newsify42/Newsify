const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    post_title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    source: {
      type: Array,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
