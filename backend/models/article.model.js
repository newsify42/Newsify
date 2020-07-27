const mongoose = require("mongoose");
//const reports = require("Comment");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    username: {
      type: String,
      default: "OP",
    },
    userId: {
      type: mongoose.ObjectId,
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
    }, //Content for full version, when clicked into article
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
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
