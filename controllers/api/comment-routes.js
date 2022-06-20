const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.route('/')
.get((req, res) => {
    Comment.findAll({
        include: [
            {
                model: Post
            },
            {
                model: User
            }
        ]
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
.post((req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then(commentData => res.json({
        message: "A new comment has been created",
        comment_details: commentData
    }))
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
})

router.route('/:id')
.get((req, res) => {
    Comment.update(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({message: 'No comment found that matches this id!'});
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
.put((req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({message: 'No comment found that matches this id!'});
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
.delete((req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({message: 'No comment found that matches this id!'});
            return;
        }
        res.json({
            message: "Comment has been deleted",
            comment_details: commentData
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;