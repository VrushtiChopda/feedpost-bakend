const express = require('express')
const { createUser, getUser, deleteUser, updateUser, registerUser, loginUser } = require('../controller/user.controller')
const { authMiddleware } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/adduser', createUser)
router.get('/getuser', getUser)
router.delete('/deleteuser/:id', authMiddleware, deleteUser)
router.put('/updateuser/:id', authMiddleware, updateUser)

router.post('/register', registerUser)
router.post('/login', loginUser)
module.exports = router