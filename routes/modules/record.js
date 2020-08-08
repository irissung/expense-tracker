const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

//to create page
router.get('/create', (req, res) => {
  res.render('new')
})

//create new record
router.post('/new', (req, res) => {
  const body = req.body
  body.amount = Math.abs(Number(body.amount))
  Category.find({ "name": `${body.category}` })
    .lean()
    .then(item => {
      body.icon = item[0].icon
      return Record.create(body)
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const categories = []
  Category.find()
    .lean()
    .then(items => {
      items.forEach(item => categories.push(item))
    })
  return Record.findById(id)
    .lean()
    .then((record) => {
      const categoriesList = categories.filter(item => item.name !== record.category)
      res.render('edit', { record, categoriesList })
    })
    .catch(error => console.log(error))
})

//edit record detail
router.put('/:id', (req, res) => {
  const body = req.body
  const id = req.params.id
  body.amount = Math.abs(Number(body.amount))
  Category.find({ "name": `${body.category}` })
    .lean()
    .then(item => { body.icon = item[0].icon })
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//delete record detail
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router