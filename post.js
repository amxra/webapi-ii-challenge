const express = require('express');
const db = require('./data/db');

const router = express.Router()

router.get('/', (req,res) => {
    db.find()
        .then(posts => {
            if(posts){
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(()=>{
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

router.get('/:id', (req,res) => {
    const id = req.params.id;
    db.findById(id)
        .then(posts => {
            if(posts.length > 0){
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(()=>{
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

router.post('/', (req,res) => {
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

router.put('/:id', (req,res) => {
    const id = req.params.id
    const post = req.body
    if(post.title && post.contents){
        db.update(id,post)
            .then(data => {
                if(data){
                    db.findById(id).then(updatedUser => {
                        res.status(200).json(updatedUser[0])
                    })
                } else {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist."
                    })
                }
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

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    db.remove(id)
        .then(data => {
            if(data){
                res.status(200).json({
                    message: "post deleted"
                })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(()=> {
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})

router.get('/:id/comments', (req,res) => {
    const id = req.params.id;

    db.findPostComments(id)
        .then(data => {
            if(data.length > 0){
                res.status(200).json(data)
            }
            else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(()=>{
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
        })
})

router.post('/:id/comments', (req,res) => {
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

module.exports = router;