const express = require('express')
const router = express.Router()

// API Routes

// User Routes
router.get('/user')
router.post('/register')
router.post('/login')
router.put('/user/:id')
router.delete('/user/:id')

// Article Routes
router.get('/article')
router.post('/article')
router.put('/article/:id')
router.delete('/article/:id')



module.exports = router