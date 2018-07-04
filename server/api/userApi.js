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
  //console.log(params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    //console.log(result)
    if (err) {
      console.log(err)
    }
    if (result.length) {
      if(req.session.user){
        console.log("您已登陆")
      }else{
        req.session.user = {
          username: params.username,
          password: params.password
        }
      }
      jsonWrite(res, result)
    } else {
      res.json({ status: 404, message: '登录失败' })
    }
  })
})

router.get('/logout', function(req, res, next){
    req.session.destroy(function(err){
        if(!err){
            res.clearCookie("bms");
            //res.redirect('/');
        }
    });
});

module.exports = router