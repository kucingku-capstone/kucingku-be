const express = require('express')
const router = express.Router()
const {
    loginHandler,
    registerHandler
} = require('../handler/auth')

// all auth routes here

router.get('/login', loginHandler )

router.get('/register', registerHandler )

module.exports = router
