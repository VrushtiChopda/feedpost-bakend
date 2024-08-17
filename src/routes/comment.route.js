const express = require('express')
const { addComment, getComment } = require('../controller/comment.controller')
const router = express.Router()
const { validate } = require('express-validation')
const { addCommentValidaton } = require('../validations/comment.validation')

router.post('/addComment', validate(addCommentValidaton), addComment)
router.get('/getComment', getComment)
module.exports = router