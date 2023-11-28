const express = require('express')
const router = express.Router()

const { getAllDataHandler } = require('../handler/index')

//route for all authenticated user
router.get('/', getAllDataHandler)

module.exports = router