const express = require('express')
const router = express.Router()
// 準備引入路由模組

const home = require('./modules/home')
const record = require('./modules/record')

router.use('/', home)
router.use('/record', record)

// 匯出路由器
module.exports = router