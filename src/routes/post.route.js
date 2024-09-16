const express = require('express')
const { createPost, getPost, updatePost, deletePost, getPostByUserId } = require('../controller/post.controller')
const router = express.Router()
const { validate } = require('express-validation')
const { addPostValidation, postId, updatePostValidation } = require('../validations/post.validation')
const { authMiddleware } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/multer.middleware')

router.post('/addPost', authMiddleware, upload.single('postImage'), validate(addPostValidation), createPost)
router.get('/getpost', getPost)
router.get('/getPostById', authMiddleware, getPostByUserId)
router.put('/updatePost/:id', authMiddleware, validate(postId), validate(updatePostValidation), updatePost)
router.delete('/deletePost/:id', authMiddleware, validate(postId), deletePost)
module.exports = router