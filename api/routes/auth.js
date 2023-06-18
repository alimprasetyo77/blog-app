import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import argon from 'argon2'
const router =  express.Router()

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body ;
    try {
        // const salt = await bcrypt.genSalt(10);
        const hashedPass = await argon.hash(password)
        const newUser = new User({
          username: username,
          email: email,
          password: hashedPass,
        });
    
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
})
router.post('/login', async (req, res) => {
    try {
        const user =  await User.findOne({ username: req.body.username })
        if(!user) return res.status(400).json({ message: 'User already exist' })
        // !user && res.status(400).json({message: 'User not found'})
        const validated = await argon.verify( user.password, req.body.password )
        if(!validated) return res.status(400).json({ message: 'Wrong password' })
        // !validated && res.status(400).json({message: 'Wrong password'})

        const {password, ...other} = user._doc  
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router