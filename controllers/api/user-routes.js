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
        // req.session.save(() => {
        //     req.session.customer_id = userData.id;
        //     req.session.username = userData.username;
        //     req.session.loggedIn = true;
        //     console.log("User Created!");
        //     res.json(userData);
        // }) 
        res.json({
            message: "User has been created!",
            user: userData
        });
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

router.post('/login', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username,
      }
    }).then(userData => {
      if (!userData) {
        res.status(400).json({ message: 'No user with the specified username' });
        return;
      }
      const validPassword = userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    });
  });
  
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