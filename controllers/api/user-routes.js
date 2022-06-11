const router = require('express').Router();
const { User } = require('../../models');

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
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

    



module.exports = router;