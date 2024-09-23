const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

const createReply = {
    body: Joi.object({
        commentReply: Joi.string().required()
    })
}

const replyId = {
    params: Joi.object({
        id: Joi.string().required()
    })
}

const updateReply = {
    body: Joi.object({
        commentReply: Joi.string().optional()
    })
}

module.exports = { createReply, replyId, updateReply }