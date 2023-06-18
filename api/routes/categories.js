import express from 'express'
import Category from '../models/Category.js'
const router = express.Router()

router.post('/', async (req, res) => {
    const newCat = new Category(req.body)
    try {
        const saveCategory = await newCat.save()
        res.status(200).json(saveCategory)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const getCat = await Category.find()
        res.status(200).json(getCat)
    } catch (error) {
        res.status(500).json({message : error.message})        
    }
})

export default router