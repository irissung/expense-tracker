const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const Record = require('./models/Record')
const Category = require('./models/Category')

//載入&連線mongoose
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
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

//to create page
app.get('/record/create', (req, res) => {
  res.render('new')
})

//create new record
app.post('/new', (req, res) => {
  const body = req.body
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
app.get('/record/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

//edit record detail
app.post('/:id/edit', (req, res) => {
  const body = req.body
  const id = req.params.id
  body.amount = Number(body.amount)
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
app.post('/record/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//filter record category
app.get('/filter/:name', (req, res) => {
  const name = req.params.name
  const categories = []
  let totalAmount = 0
  Category.find()
    .lean()
    .then(items => {
      items.forEach(item => categories.push(item))
    })
  return Record.find({ 'category': `${name}` })
    .lean()
    .then(records => {
      records.forEach(item => totalAmount += item.amount)
      res.render('index', { totalAmount, records, categories })
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})