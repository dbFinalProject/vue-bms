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

// 增加用户接口
router.post('/login', (req, res) => {
  //var conn = mysql.createConnection(models.mysql)
  var sql = $sql.queryAdmin
  var params = req.body
  conn.query(sql, [params.username], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      if(result[0].userPassword === params.password)
        console.log(result[0].userName)
        jsonWrite(res, result)
      else{
        
      }
    }
  })
})

module.exports = router
