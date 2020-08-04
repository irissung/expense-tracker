const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: String,
  category: String,
  date: String,
  amount: Number,
  totalAmount: Number,
  icon: String,
  remark: String
})
module.exports = mongoose.model('Record', recordSchema)