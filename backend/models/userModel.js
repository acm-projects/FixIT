const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    yearClassification: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    posts: [{ // array of post documents by post IDs set up in userSchema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true }); // including this automatically adds the createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);
