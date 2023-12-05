const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/index')

const { getAllDataHandler } = require('../handler/index')

router.use(authMiddleware);

//route for all authenticated user
router.get('/api/dashboard', getAllDataHandler)

module.exports = router