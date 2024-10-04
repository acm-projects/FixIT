const express = require('express');
const router = express.Router();
const {
    getUser,
    createNewUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

router.post('/', createNewUser);

router.get('/:username', getUser);

router.delete('/:username', deleteUser);

router.patch('/:username', updateUser);

module.exports = router;