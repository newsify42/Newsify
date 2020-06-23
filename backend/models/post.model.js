const mongoose = require('mongoose');
//const Comments = require("Comment");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    username: {type: String, required: true, unique: false},
    title: {type: String, required: true},
    //Content for full version, when clicked into article
    content: {type: String, required: true},
    //Summary of post to be displayed on the feed
    summary: {type: String, required: true},
    likes: Number,
    //comments: Array
},

    {
        timestamps: true
    }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;