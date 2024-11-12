const express = require('express');
const router = express.Router();
const {
    getPost,
    get25Posts,
    getPostsWithComments,
    createNewPost,
    deletePost,
    updatePost,
} = require('../controllers/postController');

router.get('/:postId', getPost);

router.get('/', get25Posts);

router.get('/:postId/includeComments', getPostsWithComments);

router.post('/:username', createNewPost);

router.delete('/:username/:postId', deletePost);

router.patch('/:postId', updatePost);

module.exports = router;