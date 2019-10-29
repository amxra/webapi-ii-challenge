const express = require('express');

const server = express()

server.use(express.json())

const db = require('./data/db')

//Endpoints

server.post('/api/posts', (req,res) => {
    const post = req.body
    if(post.title && post.contents){
        db.insert(post)
            .then(data => {
                db.findById(data.id).then(createdUser => {
                    res.status(201).json(createdUser[0])
                })
            })
            .catch(() => {
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
})

server.post('/:id/comments', (req,res) => {
    const id = req.params.id;
    const comment = req.body;

    db.findById(id)
        .then(posts => {
            if(posts.length === 0){
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })

    db.insertComment(comment)
        .then(data => {
            db.findCommentById(data.id).then(comment => {
                res.status(201).json(comment)
            })   
        })
        .catch(() => {
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            })
        })
})


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + (process.env.PORT || 3000))
})