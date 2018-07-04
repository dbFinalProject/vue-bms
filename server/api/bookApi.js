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

router.post('/sale', function(req, res, next){
  var sqlQuerySaleBook = $sql.querySaleBook
  var sqlSaleBook = $sql.saleBook
  var sqlInsertSaleRecord = $sql.insertSaleRecord
  var params = req.body
  //查看库存是否足够
  conn.query(sqlQuerySaleBook, [params.bookId, params.count], function(err, result){
    if(!err){
      if(result.length){
        //插入一条销售记录
        conn.query(sqlInsertSaleRecord, [params.bookId, new Date(), params.count, params.customerName], function(err, result){
          if(!err){
            //卖出一本，修改库存
            conn.query(sqlSaleBook, [params.count, params.bookId], function (err, result) {
              res.json(result)
            });
          }else{
            res.json({status: 404, message: "发生错误，请重试"})
          }
        });
      }else{
        res.json({status: 404, message: "请输入正确的退货信息！"})
      }
    }else{
      res.json({status: 404, message: "发生错误，请重试"})
    }
  });

});

router.post('/return', function(req, res, next){
  var sqlQuerySaleRecord = $sql.querySaleRecord
  var sqlInsertReturnRecord = $sql.insertReturnRecord
  var sqlSaleBook = $sql.saleBook
  var params = req.body
  console.log(params)
  //查看是否有该用户的销售记录
  conn.query(sqlQuerySaleRecord, [params.bookId, params.customerName, params.count], function (err, result) {
    if(!err){
      if(result.length){
        //插入一条退货记录
        conn.query(sqlInsertReturnRecord, [params.bookId, new Date(), params.count, params.customerName], function(err, result){
          if(!err){
            //退货一本书，修改库存
            conn.query(sqlSaleBook, [0-params.count, params.bookId], function (err, result) {
              res.json(result)
            });
          }else{
            res.json({status: 404, message: "发生错误，请重试"})
          }
        });
      }else{
        res.json({status: 404, message: "请输入正确的退货信息！"})
      }
    }else{
      res.json({status: 404, message: "发生错误，请重试"})
    }
  });
});

module.exports = router
