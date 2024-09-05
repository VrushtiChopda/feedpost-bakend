const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

const createReply = {
    body: Joi.object({
        // parentId: Joi.string().required(),
        // userId: Joi.string().required(),
        // postId: Joi.string().required(),
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
        // parentId: Joi.string().optional(),
        // userId: Joi.string().optional(),
        // postId: Joi.string().optional(),
        commentReply: Joi.string().optional()
    })
}

module.exports = { createReply, replyId, updateReply }