const express = require('express');
const router = express.Router();
const {
    chatWithBotViaTextInput,
    chatWithBotViaAudioInput,
} = require('../controllers/chatBotController');


router.post('/chatViaText', chatWithBotViaTextInput);

router.post('/chatViaAudio', chatWithBotViaAudioInput);

module.exports = router;