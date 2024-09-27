const mongoose = require('mongoose');
const replySchema = require('./replyModel');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    commentID: {
        type: Number,
        required: true
    },
    replyID: {
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
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    },
    replies: replySchema,
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
