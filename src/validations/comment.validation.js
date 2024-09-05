const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

const addCommentValidaton = {
    body: Joi.object({
        postId: Joi.string().optional(),
        comment: Joi.string().required(),
        replies: Joi.string().optional()
    })
}

const updateCommentValidation = {
    body: Joi.object({
        comment: Joi.string().optional(),
        replies: Joi.string().optional()
    })
}

const commentId = {
    params: Joi.object({
        id: Joi.objectId().required()   
    })
}

module.exports = { addCommentValidaton, updateCommentValidation, commentId }