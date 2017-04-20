const Article = require('../models/article')
const User = require('../models/user')
const Help = require('../helpers/verify')
require('dotenv').config()

module.exports = {

  getArticles: (req,res)=> {
    Article.find({})
      .populate('author')
      .exec((err,articles)=> {
        if(err) {
          console.log('Articles not found')
          res.status(400).send(err)
        } else {
          res.send(articles)
        }
      })
  },
  newArticle: (req,res)=> {
    let decoded = Help.decode(req.headers.token)
    new Article({
      title: req.body.title,
      content: req.body.content,
      author: decoded.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }).save((err, article)=> {
      if(err) {
        console.log(err)
        res.status(400).send(err)
      } else {
        User.update({_id: decoded.id}, {$push: {articles: article._id}}, {new: true, safe: true, upsert: true}).exec((error,result)=> {
          if(error) {
            console.log(error)
            res.status(400).send(error)
          } else {
            console.log('Article created')
            res.send(article)
          }
        })
      }
    })
  },
  editArticle: (req,res)=> {
    Article.findById(req.params.id, (err, article)=> {
      if(err) res.status(400).send(err)
      article.title= req.body.title ? req.body.title : article.title,
      article.content= req.body.content ? req.body.content : article.content,
      article.updatedAt= new Date()
      article.save((err,artile)=> {
        if(err) {
          console.log(err)
          res.status(400).send(err)
        } else {
          console.log(artile)
          res.send('Update success')
        }
      })
    })
  },
  deleteArticle: (req,res)=> {
    Article.findByIdAndRemove(req.params.id, (err,article)=> {
      if(err) {
        console.log(err)
        res.status(400).send(err)
      } else {
        User.update({_id: article.author}, {$pullAll: [{articles: article._id}]}).exec((error, result)=> {
          if(error) {
            console.log(error)
            res.status(400).send(error)
          } else {
            console.log(article)
            res.send('Delete success')
          }
        })
      }
    })
  }

}