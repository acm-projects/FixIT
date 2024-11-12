const express = require('express');
const router = express.Router();
const {
    getComment,
    createNewComment,
    deleteComment,
    updateComment
} = require('../controllers/commentController');

router.get('/:commentId', getComment);

router.post('/:postId/:username', createNewComment);

router.delete('/:commentId', deleteComment);

router.patch('/:commentId', updateComment);

module.exports = router;

