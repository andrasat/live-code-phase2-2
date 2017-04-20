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
    let token = jwt.sign({username: req.user.username}, process.env.SECRET)
    res.send(token)
  },
  editUser: (req,res)=> {
    User.findByIdAndUpdate(req.params.id, {
      
    })
  }

}