const User = require('../models/userModel');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
    const {userId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).json({error: 'No such user'});

    const user = await User.findById(userId);

    if (!user)
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
    const {userId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).json({error: 'No such user'});

    const user = await User.findOneAndDelete({_id: userId});

    if (!user)
        return res.status(404).json({error: 'No such user'});

    res.status(200).json({mssg: 'User deleted', user: userId});
    console.log(`User ${user.username} was deleted.`);
}

const updateUser = async (req, res) => {
    const {userId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).json({error: 'No such user'});

    const user = await User.findOneAndUpdate({_id: userId}, {...req.body}, {new: true});

    if (!user)
        return req.status(400).json({error: 'No such user'});

    res.status(200).json({mssg: 'User information was updated', user: user});
    console.log(`${user.username}'s information was updated.`);
}

module.exports = {
    getUser,
    createNewUser,
    deleteUser,
    updateUser
}
