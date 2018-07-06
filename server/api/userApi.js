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
  // console.log(params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    //console.log(result)
    if (!err) {
      if (result.length) {
        if(req.session.loginUser === params.username){
          res.json({status: true, message: '登录成功'})
        }else{
          req.session.loginUser=params.username
          res.json({status: true, message: '登录成功'})
        }
      } else {
        res.json({ status: false, message: '登录失败' })
      }
    }
  })
})

module.exports = router
