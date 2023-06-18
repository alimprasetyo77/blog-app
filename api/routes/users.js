import express from 'express'
import User from '../models/User.js';
import Post from '../models/Post.js';
import argon from 'argon2'
const router =  express.Router()

router.put('/:id', async (req, res) => {
    if(req.body.userId !== req.params.id) return res.status(401).json({message : 'User not found'})
    if(req.body.password){
        req.body.password = await argon.hash(req.body.password)
    }

    try {
        const updateUser =  await User.findByIdAndUpdate( req.params.id, {
            $set : req.body
        }, {new : true})

        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

router.delete('/:id', async (req, res) => {
    if(req.body.userId !== req.params.id) return res.status(401).json({message : 'You can delete only your account!'})
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({message : 'User not found'})
        
        await Post.deleteMany({username: user.username})
        await User.findOneAndDelete(req.params.id)
        res.status(200).json({message : 'User has been deleted'})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// GET USER BY ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(404).json({message : 'User not found'})
    }
})

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

export default router