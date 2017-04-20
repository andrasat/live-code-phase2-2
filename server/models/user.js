const mongoose = require('mongoose')
const uniqueVal = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  articles: [{type: Schema.Types.ObjectId, ref:'Article'}]
})

userSchema.path('email').validate((email)=> {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}, 'Invalid email format')

const User = mongoose.model('User', userSchema)
userSchema.plugin(uniqueVal)

module.exports = User