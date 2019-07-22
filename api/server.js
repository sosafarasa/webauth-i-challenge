const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');

//

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

//

dotenv.config();
const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

//

server.get('/', (req, res) => {
    res.send(`<h1>Hey there, it's working!</h1>`);
});

//

module.exports = server;