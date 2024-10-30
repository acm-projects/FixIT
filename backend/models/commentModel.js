const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
