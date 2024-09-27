const mongoose = require('mongoose');
const commentSchema = require('./commentModel');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postID: {
        type: Number,
        required: true
    },
    userID: {
        type: Number,
        required: true
    },
    authorFirstName: {
        type: String,
        required: true
    },
    authorLastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    },
    comments: commentSchema,
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
