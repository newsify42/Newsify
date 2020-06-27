const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const reports = require("Comment");
const postSchema = new Schema({
    username: {type: String, required: true, unique: false},
    title: {type: String, required: true},
    content: {type: String, required: true},    //Content for full version, when clicked into article
    summary: {type: String, required: true},    //Summary of post to be displayed on the feed
    likes: Number,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    reports: [{ type: Schema.Types.ObjectId, ref: 'Report'}]
},

    {
        timestamps: true
    }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;