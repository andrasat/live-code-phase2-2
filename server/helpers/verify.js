const jwt = require('jsonwebtoken')
const Article = require('../models/article')
require('dotenv').config()

module.exports = {
  verifyUser: (req,res,next)=> {
    console.log(req.headers.token)
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=> {
      if(decoded) {
        Article.findById(req.params.id, (err,article)=> {
          if(err) {
            console.log(err)
            res.status(401).send(err)
          } else if(!article){
            console.log('Not found')
            res.send(401).send('Not found')
          } else {
            if(decoded.id == article.author) {
              next()
            } else {
              console.log('Not the author')
              res.send(401).send('Not found')
            }
          }
        })
      } else {
        console.log('Restricted Access')
        res.status(401).send('Restricted Access')
      }
    })
  },
  decode: (token)=> {
    try {
      return jwt.verify(token, process.env.SECRET)
    } catch(err) {
      return err
    }
  }
}