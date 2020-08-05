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

app.get('/', (req, res) => {
  const categories = []
  Category.find()
    .lean()
    .sort({ name: -1 })
    .then(items => {
      items.forEach(item => {
        categories.push(item)
      })
    })
    .catch(error => console.log(error))

  Record.find()
    .lean()
    .then(records => res.render('index', { records, categories }))
    .catch(error => console.log(error))

})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})