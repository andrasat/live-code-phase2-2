const Article = require('../models/article')

module.exports = {

  getArticles: (req,res)=> {
    Article.find((err,articles)=> {
      if(err) {
        console.log('Articles not found')
        res.status(400).send(err)
      } else {
        res.send(articles)
      }
    })
  },
  newArticle: (req,res)=> {
    new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.body.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }).save((err, article)=> {
      if(err) {
        console.log(err)
        res.status(400).send(err)
      } else {
        console.log('Article created')
        res.send(article)
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
        console.log(article)
        res.send('Delete success')
      }
    })
  }

}