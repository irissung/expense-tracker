const Record = require('../Record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(
    {
      category: '餐飲食品',
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      category: '家居物業',
      icon: '<i class="fas fa-home"></i>'
    },
    {
      category: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      category: '交通出行',
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      category: '其他',
      icon: '<i class="fas fa-hand-holding-usd"></i>'
    },
  )
  console.log('category done')
})