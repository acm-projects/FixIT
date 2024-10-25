const User = require('../models/userModel');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

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
    const {username, password, email, firstName, lastName, yearClassification, major, posts} = req.body;
    try {
        const newUser = await User.create({username, password, email, firstName, lastName, yearClassification, major, posts});
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

const chatWithBot = async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage)
        return res.status(400).json({error: 'You must send a message!'})

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." }, // helps establish the role or behavior that the model should adopt during the conversation
                { role: "user", content: userMessage }
            ],
        });

        const botMessage = completion.choices[0].message.content;
        res.status(200).json({ reply: botMessage });
    
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {
    getUser,
    createNewUser,
    deleteUser,
    updateUser,
    getAllPostsByUser,
    chatWithBot
}
