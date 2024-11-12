const Post = require('../models/postModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const getPost = async (req, res) => {
    const { postId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId))
        return res.status(404).json({ error: 'No such post' });

        const post = await Post.findById(postId);

        if (!post)
            return res.status(404).json({ error: 'No such post' });

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const get25Posts = async (req, res) => { // change later to top 25 or more posts (not all)
    try {
        const posts = await Post.find().limit(25);
        res.status(200).json(posts); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const getPostsWithComments = async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId))
        return res.status(404).json({ error: 'No such post' });

    try {
        const post = await Post.findById(postId)
            .populate('comments')  // populates the comments array with the full comment documents
            .exec();

        if (!post)
            return res.status(404).json({ error: 'Post not found' });

        res.status(200).json({ post });
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const createNewPost = async (req, res) => {
    const { username } = req.params;
    const { title, content, upvotes = 0, images, comments } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user)
            return res.status(404).json({ error: 'No such user' });
        
        const newPost = await Post.create({ title, username: username, authorFirstName: user.firstName , authorLastName: user.lastName, content, images, upvotes, comments });
        
        User.findOneAndUpdate( // add the post ID to the user's posts array
            { username },
            { $push: { posts: newPost._id } },
            { new: true }
        );
        
        res.status(200).json({ mssg: 'Post created', post: newPost });
        console.log(`Post was created for ${ username }.`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const deletePost = async (req, res) => {
    const { postId, username } = req.params;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(postId))
            return res.status(404).json({ error: 'No such post' });

        const post = await Post.findOneAndDelete({ _id: postId });

        if (!post)
            return res.status(404).json({ error: 'No such post' });

        await User.findOneAndUpdate( // delete the post's post ID associated with the user's posts array
                { username },
                { $pull: { posts: postId } },
            );

        res.status(200).json({ mssg: 'Post deleted', user: post });
        console.log(`Post titled "${ post.title }" was deleted.`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const updatePost = async (req, res) => {
    const { postId } = req.params;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(postId))
            return res.status(404).json({ error: 'No such post' });

        const post = await Post.findOneAndUpdate({ _id: postId }, { ...req.body }, { new: true });

        if (!post)
            return res.status(400).json({error: 'No such post'});

        res.status(200).json({ mssg: 'Post information was updated', post: post });
        console.log(`"${ post.title }" information was updated`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

module.exports = {
    getPost,
    get25Posts,
    getPostsWithComments,
    createNewPost,
    deletePost,
    updatePost
}
