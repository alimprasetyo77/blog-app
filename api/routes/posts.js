import express from 'express'
import User from '../models/User.js';
import Post from '../models/Post.js';
import fs from 'fs'
const router =  express.Router()

// CREATE POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(201).json(savePost)
    } catch (error) {
        res.status(500).json({message : error.message})        
    }
})

// UPDATE POST
router.put('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    if(post.username !== req.body.username) return res.status(401).json({ message: 'You can update only your post!'})
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id ,
            {$set : req.body},
            {new : true} 
        )
        res.status(200).json(updatePost)        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// DELETE POST
router.delete('/:id', async(req, res) => {
    const post = await Post.findById(req.params.id)
    if(post.username !== req.body.username) return res.status(401).json({ message: 'You can delete only your post!'})
    try {
        if(post.photo){
            const filePath  = `./images/${post.photo}`
            fs.unlinkSync(filePath)
        }
        await post.delete()
        res.status(200).json({message : 'Post successfully deleted'})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
// GET POST BY USERID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message : error.message})
    }

})

// GET ALL POSTS
router.get('/', async (req, res) => {
    const username = req.query.user
    const catName = req.query.cat
    const page = req.query.p
    const perPage = 3
    try {
       let posts 
        if(username) {
            posts = await Post.find({username: username})
        }else if (catName) {
            posts = await Post.find({
                categories : {
                    $in: [catName] 
                }
        })
        }else{
            posts = await Post.find().limit(perPage).skip(page * perPage)
        }
        if(posts.length === 0) return res.status(404).json({message : 'No posts found'}) 
        res.status(200).json({posts})
   } catch (error) {
        res.status(500).json({message : error.message})
   }
})

export default router