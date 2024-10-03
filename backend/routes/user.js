const express = require('express');
const router = express.Router();
const {
    getUser,
    createNewUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

router.post('/', createNewUser);

router.get('/:userId', getUser);

router.delete('/:userId', deleteUser);

router.patch('/:userId', updateUser);

module.exports = router;