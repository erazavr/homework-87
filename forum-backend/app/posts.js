const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware /auth');

const Post = require('../models /Post');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    let post;
   if (req.query.post) {
       post = await Post.find({_id: req.query.post}).populate('user');

   } else {
       post = await Post.find().populate('user').sort({datetime: -1});
   }
   res.send(post)
});
router.post('/', auth, upload.single('image'), async (req,res) => {
    const postData = req.body;
    if (req.file) {
        postData.image = req.file.filename
    }
    postData.user = req.user._id;
    const post = new Post(postData);
    try {
        await post.save();
        return res.send(post)
    }catch (error) {
        res.status(400).send(error)
    }
});


module.exports = router;