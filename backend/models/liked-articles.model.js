const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likedArticleSchema = new Schema({
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
  liked: {
    type: Boolean,
    required: true,
  },
});

const LikedArticle = mongoose.model("LikedArticle", likedArticleSchema);

module.exports = LikedArticle;
