const express = require('express');
const router = express.Router();
const {
    getUser,
    createNewUser,
    deleteUser,
    updateUser,
    getAllPostsByUser,
    chatWithBot,
    transcribeAudio,
} = require('../controllers/userController');

router.post('/', createNewUser);

router.get('/:username', getUser);

router.get('/:username/posts', getAllPostsByUser);

router.delete('/:username', deleteUser);

router.patch('/:username', updateUser);

router.post('/chat', chatWithBot);

router.post('/speechToText', transcribeAudio)

module.exports = router;