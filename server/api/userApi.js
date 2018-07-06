var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

var conn = mysql.createConnection(models.mysql)

// 连接数据库
conn.connect()

// 用户登陆
router.post('/login', (req, res) => {
  var sql = $sql.queryAdmin
  var params = req.body
  // console.log(params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    if (!err) {
      if (result.length) {
        console.log(result)
        
        if(req.session.loginUser === params.username){
          res.json({status: true, message: '登录成功'})
        }else{
          req.session.loginUser=params.username
          res.json({status: true, message: '登录成功'})
        }

      } else {
        res.json({ status: false, message: '登陆失败，请检查用户名或密码！' })
      }
    }
  })
})

module.exports = router
