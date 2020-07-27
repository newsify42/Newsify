const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    articleId: {
      // Use a Number because it's easier to test for now
      type: mongoose.ObjectId,
      ref: "Article",
      //type: Number,
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
