const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.route('/')
.get((req, res) => {
    Post.findAll({
        include: [
            {
                model: Comment
            },
            {
                model: User
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
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
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
        include: [
            {
                model: Comment
            },
            {
                model: User
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
            title: req.body.title
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