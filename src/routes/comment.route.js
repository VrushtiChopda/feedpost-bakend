const express = require('express')
const { addComment, getComment, updateComment, deleteComment, getCommentByPostId, deleteCommentByAuthorizeUser } = require('../controller/comment.controller')
const router = express.Router()
const { validate } = require('express-validation')
const { addCommentValidaton, updateCommentValidation, commentId } = require('../validations/comment.validation')
const { authMiddleware } = require('../middleware/auth.middleware')

router.post('/addComment', authMiddleware, validate(addCommentValidaton), addComment)
router.get('/getComment', getComment)
router.get('/getCommentById/:id', authMiddleware, getCommentByPostId)
router.put('/updateComment/:id', authMiddleware, validate(commentId), validate(updateCommentValidation), updateComment)
router.delete('/deleteComment/:id', authMiddleware, validate(commentId), deleteComment)
router.delete('/deleteCommentByUser/:id', authMiddleware, validate(commentId), deleteCommentByAuthorizeUser)
module.exports = router