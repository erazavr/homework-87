const express = require('express');

const auth = require('../middleware /auth');
const Comment = require('../models /Comment');

const router = express.Router();
router.get('/', async (req, res) => {
    let comment;
   if (req.query.postId) {
       comment = await Comment.find({post: req.query.postId}).populate('user')
   } else {
       comment = await Comment.find()
   }
    res.send(comment)
});
router.post('/', auth, async (req,res) => {
   try {
       const comment = new Comment(req.body);
       comment.user = req.user._id;
       await comment.save();
       return res.send(comment)
   } catch (error) {
       res.status(400).send(error)
   }
});

module.exports = router;