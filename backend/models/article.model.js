const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    username: {
      type: String,
      default: "OP",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    source: {
      type: Array,
    },
    category: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Report",
      },
    ],
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
