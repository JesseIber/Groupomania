const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const jwtAuth = require('../service/security');
const multer = require('../service/multer');

router.get('/:id', jwtAuth.authenticateJWT, postController.getPostById);
router.get('/', jwtAuth.authenticateJWT, postController.getPosts);
router.post('/', jwtAuth.authenticateJWT, multer, postController.add);
router.put('/:id', jwtAuth.authenticateJWT, multer, postController.update);
router.delete('/:id', jwtAuth.authenticateJWT, postController.delete);
// router.post('/:id/like', jwtAuth.authenticateJWT, postController.like);

module.exports = router;