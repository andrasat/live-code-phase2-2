const mongoose = require('mongoose')
const uniqueVal = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {type: String, required: true},
  username: {type: Number, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, default: ''}
})

const User = mongoose.model('User', userSchema)
userSchema.plugin(uniqueVal)

module.exports = User