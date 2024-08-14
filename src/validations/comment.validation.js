const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

const addCommentValidaton = {
    body: Joi.object({
        userId: Joi.string().required(),
        postId: Joi.string().required(),
        comment: Joi.string().required()
    })
}

const updateCommentValidation = {
    body: Joi.object({
        userId: Joi.string().optional(),
        postId: Joi.string().optional(),
        comment: Joi.string().optional()
    })
}

const commentId = {
    params: Joi.object({
        id: Joi.objectId().required()
    })
}

module.exports = { addCommentValidaton, updateCommentValidation, commentId }