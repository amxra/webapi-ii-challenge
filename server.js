const express = require('express');
const server = express()
const post = require('./post')
server.use(express.json())
server.use('/api/posts', posts);

server.get('/', (req, res) => {
    res.json('welcome to my api')
})

module.exports = server;



//move post
//move plug from index to server
//import endpoints from posts
//plus in posts