const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const mongoose = require('mongoose');

const getComment = async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId))
        return res.status(404).json({ error: 'No such comment' });

    try {
        const comment = await Comment.findById(commentId);

        if (!comment)
            return res.status(404).json({ error: 'No such comment' });

        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const createNewComment = async (req, res) => {
    const { postId, username } = req.params;
    const { content, upvotes = 0, replies } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId))
        return res.status(404).json({error: 'No such post'});

    try {
        const post = await Post.findById(postId);
        if (!post)
            return res.status(404).json({ error: 'No such post' });

        const user = await User.findOne({ username });
        if (!user)
            return res.status(404).json({ error: 'No such user' });
        
        const newComment = await Comment.create({ username: username, authorFirstName: user.firstName , authorLastName: user.lastName, content, upvotes, replies });
        
        await Post.findByIdAndUpdate( // add the comment ID to the post's comments array
            postId,
            { $push: { comments: newComment._id } },
            { new: true }
        );
        
        res.status(200).json({ mssg: 'Comment created', comment: newComment });
        console.log(`Comment was created by ${ username }.`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId))
        return res.status(404).json({ error: 'No such comment' });

    try {
        const comment = await Post.findOneAndDelete({ _id: commentId });

        if (!comment)
            return res.status(404).json({ error: 'No such comment' });

        await Post.findByIdAndUpdate( // delete the comments's post ID associated with the post's comments array
            postId,
            { $pull: { comments: commentId } },
        );

        res.status(200).json({ mssg: 'Comment deleted', post: comment });
        console.log(`Comment was deleted`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const updateComment = async (req, res) => {
    const { commentId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(commentId))
        return res.status(404).json({ error: 'No such comment' });

    try {
        const comment = await Comment.findOneAndUpdate({ _id: commentId }, { ...req.body }, { new: true });

        if (!comment)
            return res.status(400).json({error: 'No such comment'});

        res.status(200).json({ mssg: 'Comment information was updated', comment: comment });
        console.log("Comment information was updated");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

module.exports = {
    getComment,
    createNewComment,
    deleteComment,
    updateComment
}
