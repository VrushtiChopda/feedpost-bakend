const express = require('express')
const { createUser, getUser, deleteUser, updateUser } = require('../controller/user.controller')
const router = express.Router()

router.post('/adduser', createUser)
router.get('/getuser', getUser)
router.delete('/deleteuser/:id', deleteUser)
router.put('/updateuser', updateUser)

module.exports = router