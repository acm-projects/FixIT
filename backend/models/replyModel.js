const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    commentID: {
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
    }
}, { timestamps: true });

module.exports = mongoose.model('Reply', replySchema);
