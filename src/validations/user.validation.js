const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

const addUser = {
    body: Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

const updateUserValidation = {
    body: Joi.object({
        fullName: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().optional()
    })
}

const userId = {
    params: Joi.object({
        id: Joi.objectId().required()
    })
}

module.exports = { addUser, updateUserValidation, userId }
