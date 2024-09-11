const express = require('express')
const { validate } = require('express-validation')
const { createReplyController, getReplyController, createNestedReplyController, updateReplyController, deleteReplyController } = require('../controller/reply.controller')
const { createReply, replyId, updateReply } = require('../validations/reply.validation')
const { authMiddleware } = require('../middleware/auth.middleware')
const router = express.Router()

// router.post('/createReply', validate(createReply), createReplyController)
router.post('/createReply', createReplyController)
router.post('/createNestedReply/:id', createNestedReplyController)
router.get('/getReply', getReplyController)
router.put('/updateReply/:id', authMiddleware, validate(replyId), validate(updateReply), updateReplyController)
router.delete('/deleteReply/:id', authMiddleware, validate(replyId), deleteReplyController)
module.exports = router 