const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Post',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;