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
    Comment.create(req.body)
    .then((comment) => {
        if (req.body.comments.length) {
            
        }
    })
})

module.exports = router;