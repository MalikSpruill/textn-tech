const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.route('/')
.get((req, res) => {
    User.findAll()
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
.post((req,res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        }) 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.route('/:id')
.get((req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment
            },
            {
                model: Post
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/login', async (req, res) => {
     const user = await User.findOne({
      where: {
        username: req.body.username,
      }
    });
    if (user) {
      const validPassword = user.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({message: 'User not found'});
        return;
      }
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({user, message: 'You are now logged in.'});
      })
    } else {
      res.status(400).json({})
    }})
  
  
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();    
      });
    }
    else {
      res.status(404).end();
    }
  });


module.exports = router;