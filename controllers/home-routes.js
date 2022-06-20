const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
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
      const posts = postData.map(post => post.get({plain: true})); 
      const loggedIn = req.session.loggedIn;
      console.log(posts);
      res.render('homepage', {posts,
      loggedIn, layout: 'main'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) { 
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
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

      // serialize the data
      console.log('=========postdata=======',postData);
      const posts = postData.get({ plain: true });
      console.log(posts);
      const loggedIn = req.session.loggedIn;
      res.render('single-post', { 
        posts,
        loggedIn,
        layout: 'main'
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;