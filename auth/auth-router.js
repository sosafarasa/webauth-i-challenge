const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
         .then(saved => {
             res.status(201).json(saved);
         })
         .catch(error => {
            res.status(500).json(error);
         });
})

module.exports = router;