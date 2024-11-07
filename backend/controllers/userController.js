const User = require('../models/userModel');
const recorder = require('node-record-lpcm16');

const { OpenAI } = require('openai');
const { TranscribeStreamingClient, StartStreamTranscriptionCommand } = require('@aws-sdk/client-transcribe-streaming');

const LanguageCode = "en-US";
const MediaEncoding = "pcm";
const MediaSampleRateHertz = "16000";
const credentials = {
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
};

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const getUser = async (req, res) => {
    const {username} = req.params;

    const user = await User.findOne({username});

    if (!username)
        return res.status(404).json({error: 'No such user'});

    res.status(200).json(user);
}

const createNewUser = async (req, res) => {
    const {username, password, email, firstName, lastName, userType, major, profileImage, posts} = req.body;
    try {
        const newUser = await User.create({username, password, email, firstName, lastName, userType, major, profileImage, posts});
        res.status(200).json({mssg: 'User created', user: newUser});
        console.log(`User ${newUser.username} was created.`);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

const deleteUser = async (req, res) => {
    const {username} = req.params;

    const user = await User.findOne({username});

    if (!username)
        return res.status(404).json({error: 'No such user'});

    res.status(200).json({mssg: 'User deleted', user: username});
    console.log(`User ${user.username} was deleted.`);
}

const updateUser = async (req, res) => {
    const {username} = req.params;
    
    const user = await User.findOneAndUpdate({username: username}, {...req.body}, {new: true});

    if (!user)
        return req.status(400).json({error: 'No such user'});

    res.status(200).json({mssg: 'User information was updated', user: user});
    console.log(`${user.username}'s information was updated.`);
}

const getAllPostsByUser = async (req, res) => {
    const {username} = req.params;

    const posts = await User.findOne({username}).select('posts -_id').populate({
        path: 'posts',
        select: '-_id'
    });

    if (!username)
        return res.status(404).json({error: 'No such user'});

    res.status(200).json(posts);
}

module.exports = {
    getUser,
    createNewUser,
    deleteUser,
    updateUser,
    getAllPostsByUser,
}
