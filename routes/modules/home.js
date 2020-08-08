const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', (req, res) => {
  const categories = []
  let totalAmount = 0
  Category.find()
    .lean()
    .then(items => {
      items.forEach(item => categories.push(item))
    })
    .catch(error => console.log(error))

  Record.find()
    .lean()
    .sort({ 'date': 1 })
    .then(records => {
      records.forEach(item => totalAmount += item.amount)
      res.render('index', { records, categories, totalAmount })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router