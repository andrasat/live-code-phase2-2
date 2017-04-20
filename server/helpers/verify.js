const jwt = require('jsonwebtoken')
const Article = require('../models/article')
require('dotenv').config()

module.exports = {
  verify: (req,res,next)=> {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=> {
      if(decoded) {
        Article.findOne({author: decoded.id}, (err,article)=> {
          if(err) {
            console.log(err)
            res.status(401).send(err)
          } else {
            next()
          }
        })
      } else {
        console.log('Restricted Access')
        res.status(401).send('Restricted Access')
      }
    })
  }
}