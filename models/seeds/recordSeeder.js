const Record = require('../Record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(
    {
      name: '早餐',
      category: '餐飲食品',
      date: '2020-08-04',
      amount: 55,
      icon: '<i class="fas fa-utensils"></i>',
      remark: '永和豆漿'
    },
    {
      name: '驚聲尖笑',
      category: '休閒娛樂',
      date: '2020-08-05',
      amount: 800,
      icon: '<i class="fas fa-grin-beam"></i>',
      remark: '台中國家歌劇院'
    },
    {
      name: '車票',
      category: '交通出行',
      date: '2020-08-08',
      amount: 100,
      icon: '<i class="fas fa-shuttle-van"></i>',
      remark: '統聯客運'
    },
    {
      name: '房租',
      category: '家居物業',
      date: '2020-08-01',
      amount: 15000,
      icon: '<i class="fas fa-home"></i>',
      remark: '8月租金'
    },
    {
      name: '保險費',
      category: '其他',
      date: '2020-08-04',
      amount: 55,
      icon: '<i class="fas fa-hand-holding-usd"></i>',
      remark: '儲蓄醫療險'
    },
  )
  console.log('record done!')
})
