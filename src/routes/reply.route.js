const express = require('express')
const { validate } = require('express-validation')
const { createReplyController, getReplyController } = require('../controller/reply.controller')
const createReply = require('../validations/reply.validation')
const router = express.Router()

router.post('/createReply', validate(createReply), createReplyController)
router.get('/getReply', getReplyController)
module.exports = router 