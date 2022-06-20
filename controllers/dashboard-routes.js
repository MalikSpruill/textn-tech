const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_message',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(postData => {
        // serialize data before passing to template
        const posts = postData.map(post => post.get({ plain: true }));
        const loggedIn = req.session.loggedIn;
        console.log(posts);
        res.render('dashboard', { posts, loggedIn, layout: 'main'});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'post_message',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = postData.get({ plain: true });
      const loggedIn = req.session.loggedIn;

      res.render('edit-post', {
       post,
       loggedIn,
       layout: 'main'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;