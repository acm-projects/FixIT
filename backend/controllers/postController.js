const Post = require('../models/postModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const getPost = async (req, res) => {
    const {postId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(postId))
        return res.status(404).json({error: 'No such post'});

    const post = await Post.findById(postId);

    if (!post)
        return res.status(404).json({error: 'No such post'});

    res.status(200).json(post);
}

const createNewPost = async (req, res) => {
    const {username} = req.params;
    const {title, authorFirstName, authorLastName, content, upvotes = 0, comments} = req.body;

    try {
        const user = await User.findOne({username});

        if (!user)
            return res.status(404).json({error: 'No such user'});
        
        const newPost = await Post.create({title, authorFirstName: user.firstName , authorLastName: user.lastName, content, upvotes, comments});
        
        User.findOneAndUpdate( // add the post ID to the user's posts array
            {username},
            {$push: {posts: newPost._id}},
            {new: true}
        );
        
        res.status(200).json({mssg: 'Post created', post: newPost});
        console.log(`Post was created for ${username}.`);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

const deletePost = async (req, res) => {
    const {postId, username} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(postId))
        return res.status(404).json({error: 'No such post'});

    const post = await Post.findOneAndDelete({_id: postId});

    if (!post)
        return res.status(404).json({error: 'No such post'});

    await User.findOneAndUpdate( // delete the post's post ID associated with the user's posts array
            {username},
            {$pull: {posts: postId}},
        );

    res.status(200).json({mssg: 'Post deleted', user: post});
    console.log(`Post titled "${post.title}" was deleted.`);
}

const updatePost = async (req, res) => {
    const {postId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(postId))
        return res.status(404).json({error: 'No such post'});

    const post = await Post.findOneAndUpdate({_id: postId}, {...req.body}, {new: true});

    if (!post)
        return res.status(400).json({error: 'No such post'});

    res.status(200).json({mssg: 'Post information was updated', post: post});
    console.log(`"${post.title}" information was updated`);
}

module.exports = {
    getPost,
    createNewPost,
    deletePost,
    updatePost
}
