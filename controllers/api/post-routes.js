const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.route('/')
.get((req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_message',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: User
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
.post((req,res) => {
    Post.create({
        title: req.body.title,
        post_message: req.body.post_message,
        user_id: req.session.user_id
    })
    .then(postData => res.json({
        message: "Post has been created",
        post: postData
    }))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.route('/:id')
.get((req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_message',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
.put((req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_message: req.body.post_message
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
.delete((req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;