const express = require('express')
const { addComment, getComment, updateComment, deleteComment, getCommentByPostId } = require('../controller/comment.controller')
const router = express.Router()
const { validate } = require('express-validation')
const { addCommentValidaton, updateCommentValidation, commentId } = require('../validations/comment.validation')
const { authMiddleware } = require('../middleware/auth.middleware')

router.post('/addComment', authMiddleware, validate(addCommentValidaton), addComment)
router.get('/getComment', authMiddleware, getComment)
router.get('/getCommentById/:id', getCommentByPostId)
router.put('/updateComment/:id', authMiddleware, validate(updateCommentValidation), updateComment)
router.delete('/deleteComment/:id', authMiddleware, validate(commentId), deleteComment)
module.exports = router