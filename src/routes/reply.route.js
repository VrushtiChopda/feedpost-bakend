const express = require('express')
const { validate } = require('express-validation')
const { createReplyController, getReplyController, createNestedReplyController, updateReplyController, deleteReplyController, deleteReplyByAuthUserController } = require('../controller/reply.controller')
const { createReply, replyId, updateReply } = require('../validations/reply.validation')
const { authMiddleware } = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/createReply', validate(createReply), createReplyController)
// router.post('/createReply', createReplyController)
router.post('/createNestedReply/:id', createNestedReplyController)
router.get('/getReply/:id', getReplyController)
router.put('/updateReply/:id', authMiddleware, validate(replyId), validate(updateReply), updateReplyController)
router.delete('/deleteReply/:id', authMiddleware, validate(replyId), deleteReplyController)
router.delete('/deleteReplyByAuthUser/:id', authMiddleware, validate(replyId), deleteReplyByAuthUserController)

module.exports = router 