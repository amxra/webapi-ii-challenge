const express = require('express');

const posts = require('./post');
const server = express();

server.use(express.json());
server.use('/api/posts', posts);

server.get('/', (req,res) => {
    res.json('Hello world!')
});

module.exports = server;
