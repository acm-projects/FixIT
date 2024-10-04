const express = require('express');
const router = express.Router();
const {
    getPost,
    createNewPost,
    deletePost,
    updatePost
} = require('../controllers/postController')


router.get('/:postId', getPost);

router.post('/:userId', createNewPost);

router.delete('/:userId/:postId', deletePost);

router.patch('/:postId', updatePost);

module.exports = router;