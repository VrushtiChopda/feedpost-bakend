const express = require('express')
const { createUser, getUser, deleteUser, updateUser, registerUser, loginUser } = require('../controller/user.controller')
const router = express.Router()

router.post('/adduser', createUser)
router.get('/getuser', getUser)
router.delete('/deleteuser/:id', deleteUser)
router.put('/updateuser/:id', updateUser)

router.post('/register', registerUser)
router.post('/login', loginUser)
module.exports = router