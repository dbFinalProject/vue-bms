var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

var conn = mysql.createConnection(models.mysql)

// 连接数据库
conn.connect()

router.get('/getBooks', function(req, res, next){
  var sql = $sql.queryBooks
  //console.log(sql)
  conn.query(sql, function (err, result) {
    res.json(result)
    //console.log(res)
  })
});

router.post('/purchase', function(req, res, next){
  var sql = $sql.purchaseBook
  var params = req.body
  console.log(params)

  conn.query(sql, [params.num, params.bookId], function (err, result) {
    res.json(result)
  })
});

module.exports = router
