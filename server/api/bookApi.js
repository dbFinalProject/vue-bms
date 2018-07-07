var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')
var url = require('url')
var querystring = require('querystring')
var conn = mysql.createConnection(models.mysql)

// 连接数据库
conn.connect()

router.get('/getBooks', function (req, res, next) {
  var sql = $sql.queryBooks
  var sqlQueryBook = $sql.queryBook

  var params = querystring.parse(url.parse(req.url).query)
  if (params.bookName) {
    conn.query(sqlQueryBook, ['%' + params.bookName + '%'], function (err, result) {
      // console.log(result)
      // console.log(err)
      res.json(result)
    })
  }else {
    conn.query(sql, function (err, result) {
      res.json(result)
    })
  }
})

router.post('/sale', function (req, res, next) {
  var sqlQueryReportoryBook = $sql.queryReportoryBook
  var sqlSaleBook = $sql.saleBook
  var sqlInsertSaleRecord = $sql.insertSaleRecord
  var params = req.body
  // 查看库存是否足够
  conn.query(sqlQueryReportoryBook, [params.bookId, params.count], function (err, result) {
    if (!err) {
      if (result.length) {
        // 插入一条销售记录
        conn.query(sqlInsertSaleRecord, [params.bookId, new Date(), params.count, params.customerName, params.saleAmount], function (err, result) {
          if (!err) {
            // 卖出一本，修改库存
            conn.query(sqlSaleBook, [params.count, params.bookId], function (err, result) {
              if (!err) {
                res.json(result)
              }
            })
          } else {
            res.json({status: 404, message: '发生错误，请重试'})
          }
        })
      } else {
        res.json({status: 404, message: '请输入正确的退货信息！'})
      }
    } else {
      res.json({status: 404, message: '发生错误，请重试'})
    }
    console.log(err)
  })
})

router.post('/return', function (req, res, next) {
  var sqlQuerySaleRecord = $sql.querySaleRecord
  var sqlInsertReturnRecord = $sql.insertReturnRecord
  var sqlSaleBook = $sql.saleBook
  var params = req.body
  console.log(params)
  // 查看是否有该用户的销售记录
  conn.query(sqlQuerySaleRecord, [params.bookId, params.customerName, params.count], function (err, result) {
    if (!err) {
      if (result.length) {
        // 插入一条退货记录
        conn.query(sqlInsertReturnRecord, [params.bookId, new Date(), params.count, params.customerName, params.returnAmount], function (err, result) {
          if (!err) {
            // 退货一本书，修改库存
            conn.query(sqlSaleBook, [0 - params.count, params.bookId], function (err, result) {
              res.json(result)
            })
          } else {
            res.json({status: 404, message: '发生错误，请重试'})
          }
        })
      } else {
        res.json({status: 404, message: '请输入正确的退货信息！'})
      }
    } else {
      res.json({status: 404, message: '发生错误，请重试'})
    }
  })
})

router.post('/getStatistics', function (req, res, next) {
  var querySaleRecordByTime = $sql.querySaleRecordByTime
  var querypurchaseTableByTime = $sql.querypurchaseTableByTime
  var params = req.body
  console.log(params)
  var data = {}
  // 销售情况
  conn.query(querySaleRecordByTime, [params.startTime, params.endTime], function (err, result) {
    if (!err) {
      data['sBook'] = result
      conn.query(querypurchaseTableByTime, [params.startTime, params.endTime], function (err, result) {
        if (!err) {
          data['pBook'] = result
          //console.log(data)
          res.json(data)
        } else {
          res.json({ status: 404, message: '发生错误，请重试' })
        }
      })
    } else {
      res.json({ status: 404, message: '发生错误，请重试' })
    }
  })
})

router.get('/getProviderInfo', function (req, res, next) {
  var queryProviderInfo = $sql.queryProviderInfo

  // 获得进货商的报价表
  conn.query(queryProviderInfo, [], function (err, result) {
    if (!err) {
      var data = []
      for (var i = 0; i < result.length; ++i) {
        if (!data[result[i].providerId - 1]) {
          data[result[i].providerId - 1] = new Array(result[i])
        } else {
          data[result[i].providerId - 1].push(result[i])
        }
      }
      res.json(data)
    } else {
      res.json({ status: 404, message: '发生错误，请重试' })
    }
  })
})

// 进货
router.post('/purchase', function (req, res, next) {
  // console.log(req.body)
  var params = req.body
  var queryIsOwnBook = $sql.queryIsOwnBook
  var updateBookNum = $sql.updateBookNum
  var purchaseBook = $sql.purchaseBook
  var insertReportory = $sql.insertReportory
  conn.query(purchaseBook, [params.providerId, params.bookId, new Date(params.purchaseTime), params.purchaseCount, params.purchaseAmount], function (err, result) {
    if (!err) {
      conn.query(queryIsOwnBook, [params.bookId], function (err, result) {
        if (!err) {
          if(result.length) {
            var bookNum = result[0].count
            conn.query(updateBookNum, [params.purchaseCount + bookNum, params.bookId], function (err, result) {
                if (!err) {
                  res.json({status: true, message: '购买成功'})
                } else {
                  res.json({ status: 404, message: '发生错误，请重试' })
                }
              })
          } else {
            conn.query(insertReportory, [params.bookId, 0, params.purchaseCount], function (err, result) {
                if (!err) {
                  res.json({status: true, message: '购买成功'})
                } else {
                  res.json({ status: 404, message: '发生错误，请重试' })
                }
              })  
          }        
        } else {
          res.json({ status: 404, message: '发生错误，请重试' })
        }
      })
    } else {
      res.json({ status: 404, message: '发生错误，请重试' })
    }
  })
})

 // 更新价格
 router.get('/changePrice', function (req, res, next) {
  var params = req.body
  var updateBookPrice = $sql.updateBookPrice
  conn.query(updateBookPrice, [params.price, params.boookId], function (err, result) {
    if (!err) {
      res.json({ status: 200, message: '修改成功' })
    } else {
      res.json({ status: 404, message: '发生错误，请重试' })
    }
  })
})

module.exports = router
