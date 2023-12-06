const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/index')
const { updateUserHandler, deleteUserHandler } = require('../handler/users')
const { getAllDataHandler } = require('../handler/index')

router.use(authMiddleware);

//route for all authenticated user

//route user authorized
router.put('/api/users/update/:id', updateUserHandler)

router.delete('/api/users/delete/:id', deleteUserHandler)

//route content
router.get('/api/dashboard', getAllDataHandler)

module.exports = router