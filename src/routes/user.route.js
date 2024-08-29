const express = require('express')
const { createUser, getUser, deleteUser, updateUser, registerUser, loginUser } = require('../controller/user.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const { validate } = require('express-validation')
const { addUser, userId, updateUserValidation, } = require('../validations/user.validation')
const router = express.Router()

router.post('/adduser', validate(addUser), createUser)
router.get('/getuser/:id', getUser)
router.delete('/deleteuser/:id', authMiddleware, deleteUser)
router.put('/updateuser/:id', validate(userId), validate(updateUserValidation), authMiddleware, updateUser)

router.post('/register', registerUser)
router.post('/login', loginUser)
module.exports = router