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
router.get('/article', Article.getArticles)
router.post('/article', Article.newArticle)
router.put('/article/:id', Helpers.verifyUser, Article.editArticle)
router.delete('/article/:id', Helpers.verifyUser, Article.deleteArticle)



module.exports = router