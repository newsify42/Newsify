const mongoose = require("mongoose");
//const reports = require("Comment");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    username: { type: String, required: true, unique: false },
    title: { type: String, required: true },
    content: { type: String, required: true }, //Content for full version, when clicked into article
    summary: { type: String, required: true }, //Summary of post to be displayed on the feed
    likes: {type: Number , default: 0}
    //comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },

  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
