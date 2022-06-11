const router = require('express').Router();
const { Post, User } = require('../../models');

router.route('/')
.get((req, res) => {
    Post.findAll({
        include: User
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;