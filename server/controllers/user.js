const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config

module.exports = {

  register: (req,res)=> {
    let saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
      new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password : hash
      }).save((err,user)=> {
        if(err) {
          console.log(err)
          res.status(400).send(err)
        } else {
          console.log(user)
          res.send('Register Success')
        }
      })
    })
  },
  login: (req,res)=> {
    User.findOne({email: req.body.email}, (err,user)=> {
      if(err) {
        console.log(err)
        res.status(400).send(err)
      } else if(user){
        bcrypt.compare(req.body.password, user.password, (err, response)=> {
          if(err) {
            console.log(err)
            res.status(400).send(err)
          } else if(!response) {
            console.log('Wrong Password')
            res.status(403).send(false)
          } else {
            console.log('Login Success')
            let token = jwt.sign({id: user._id, username: user.username, name: user.name}, process.env.SECRET)
            res.send({'token': token, 'username': user.username})
          }
        })
      } else {
        console.log('Not found')
        res.status(400).send(err)
      }
    })
  },
  getUsers: (req,res)=> {
    User.find()
      .populate('articles')
      .exec((err, users)=> {
        if(err) {
          res.status(400).send(err)
        } else {
          res.send(users)
        }
    })
  },
  getOneUser: (req,res)=> {
    User.findOne({username: req.params.username})
      .populate('articles')
      .exec((err,user)=> {
        if(err) {
          res.status(400).send(err)
        } else {
          res.send(user)
        }
      })
  },
  editUser: (req,res)=> {
    let saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
      User.findById(req.params.id, (err, user)=> {
        if(err) res.status(400).send(err)
        user.name= req.body.name ? req.body.name : user.name,
        user.username= req.body.username ? req.body.username : user.username,
        user.email= req.body.email ? req.body.email : user.email,
        user.password= hash ? hash : user.password
        user.save((err,user)=> {
          if(err) {
            console.log(err)
            res.status(400).send(err)
          } else {
            console.log(user)
            res.send('Update success')
          }
        })
      })
    })
  },
  deleteUser: (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err,user)=> {
      if(err) {
        console.log(err)
        res.status(400).send(err)
      } else {
        console.log(user)
        res.send('Delete success')
      }
    })
  }

}