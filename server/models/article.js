const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {type: String, required: true},
  content: {type: Number, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: Date,
  updatedAt: Date
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article