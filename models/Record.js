const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: String,
  amount: {
    type: Number,
    required: true
  },
  totalAmount: Number
})
module.exports = mongoose.model('Record', recordSchema)