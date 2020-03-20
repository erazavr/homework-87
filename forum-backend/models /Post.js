const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datetime: {
        type : Date,
        default: Date.now
    },
    description: String,
    image: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;