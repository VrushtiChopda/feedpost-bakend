const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

const addPostValidation = {
    body: Joi.object({
        postImage: Joi.string().optional(),
        postTitle: Joi.string().required(),
        description: Joi.string().required()
    })
}

const updatePostValidation = {
    body: Joi.object({
        postImage: Joi.string().optional(),
        postTitle: Joi.string().optional(),
        description: Joi.string().optional()
    })
}

const postId = {
    params: Joi.object({
        id: Joi.string().required()
    })
}

module.exports = { addPostValidation, updatePostValidation, postId }