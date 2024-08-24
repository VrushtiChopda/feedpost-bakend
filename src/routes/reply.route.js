const express = require('express')
const { validate } = require('express-validation')
const { createReplyController, getReplyController, createNestedReplyController, updateReplyController } = require('../controller/reply.controller')
const { createReply, replyId, updateReply } = require('../validations/reply.validation')
const { authMiddleware } = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/createReply', validate(createReply), createReplyController)
router.post('/createNestedReply/:id', createNestedReplyController)
router.get('/getReply', getReplyController)
router.put('/updateReply/:id', authMiddleware, validate(replyId), validate(updateReply), updateReplyController)
module.exports = router 