var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')
var conn = mysql.createConnection(models.mysql)

// 连接数据库
conn.connect()

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 用户登陆
router.post('/login', (req, res) => {
  var sql = $sql.queryAdmin
  var params = req.body
  conn.query(sql, [params.username, params.password], function (err, result) {
    console.log(result.length)
    if (err) {
      console.log(err)
    }
    if (result.length) {
      jsonWrite(res, result)
      // res.redirect('/');
    } else {
      return res.json({ status: 404, message: '登录失败' })
    }
  })
})

module.exports = router