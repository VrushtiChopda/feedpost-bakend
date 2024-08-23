const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

const createReply = {
    body: Joi.object({
        parentId: Joi.string().required(),
        userId: Joi.string().required(),
        postId: Joi.string().required(),
        commentReply: Joi.string().required()
    })
}

module.exports = createReply
