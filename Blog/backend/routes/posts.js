const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get a single post id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//create a new post 
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        category: req.body.author,
        image: req.body.image,
    });
    try {
        const newPost = await post.save();
        res.status(202).json(newPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//update an existing post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        post.title = req.body.title || post.title;
        post.content = req.body.title || post.content;
        post.category = req.body.category|| post.category;
        post.author = req.body.author || post.author;
        post.image = req.body.image || post.image;
        post.updateddAt = Date.now();

        const updatedPost = await post.save();
        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//delte a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        // await Post.deleteOne({_id:post._id})
        await Post.findByIdAndDelete(post._id)
        res.json({message:"post deleted"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports=router;