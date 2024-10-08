const express = require('express');
const router = express.Router();
const {
    getPost,
    createNewPost,
    deletePost,
    updatePost
} = require('../controllers/postController')

router.get('/:postId', getPost);

router.post('/:username', createNewPost);

router.delete('/:username/:postId', deletePost);

router.patch('/:postId', updatePost);

module.exports = router;