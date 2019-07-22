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

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
         .first()
         .then(user => {
             if(user && bcrypt.compareSync(password, username.password)) {
                 req.session.user = user;
                 res.status(200).json({ message: `Welcome ${user.username}!` })
             } else {
                 res.status(401).json({ message: 'Invalid Credentials' });
             }
         })
         .catch(error => {
            res.status(500).json(error);
          });
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.send('Something went wrong, please try again')
            } else {
                res.send('Bye, see you soon!')
            }
        })
    }
})
module.exports = router;