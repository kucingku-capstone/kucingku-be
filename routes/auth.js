const express = require('express');
const router = express.Router()
const {
    loginHandler,
    registerHandler
} = require('../handler/auth')

// all auth routes here

router.post('/api/login', loginHandler )

router.post('/api/register', registerHandler )

module.exports = router
