const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const Record = require('./models/Record')
const Category = require('./models/Category')

//載入&連線mongoose
require('./config/mongoose')

// 引用路由器
const routes = require('./routes')
// 將 request 導入路由器
app.use(methodOverride('_method'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

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