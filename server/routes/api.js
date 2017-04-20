const express = require('express')
const Helpers = require('../helpers/verify')
const User = require('../controllers/user')
const Article = require('../controllers/article')
const router = express.Router()

// API Routes

// User Routes
router.get('/user', User.getUsers)
router.post('/register', User.register)
router.post('/login', User.login)
router.put('/user/:id', User.editUser)
router.delete('/user/:id', User.deleteUser)

// Article Routes
router.get('/article')
router.post('/article/:userId')
router.put('/article/:id')
router.delete('/article/:id')



module.exports = router