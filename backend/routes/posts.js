const router = require('express').Router();
let Post = require('../models/post.model');
let Report = require('../models/report.model');
//let Comment = require('../models/comment.model');

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/get').get((req, res) => {
    const postID = req.body.postID;

    Post.findById(postID)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const postTitle = req.body.title;
    const postbody = req.body.content;
    const summary = req.body.summary;
    const likes = 0;


    const newPost = new Post
        ({
            username: username,
            title: postTitle,
            content: postbody,
            summary: summary,
            likes: likes
        });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
    const postID = req.body.id;

    Post.deleteOne(postID)
        .then(() => res.json('Post deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/report').post((req, res) => {
    const username = req.body.username;
    const postID = req.body.postID;
    const offense = req.body.offense;
    const content = req.body.content;

    const newReport = new Report
        ({
            username: username,
            reortedID: postID,
            offense: offense,
            content: content,
        });

    newReport.save()
        .then(() => res.json('Report added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;