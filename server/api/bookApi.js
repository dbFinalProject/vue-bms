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
  var sqlQueryBooks = $sql.queryBooks
  var sqlQueryBook = $sql.queryBook

  var params = querystring.parse(url.parse(req.url).query)
  if (params.bookName) {
    conn.query(sqlQueryBook, ['%' + params.bookName + '%'], function (err, result) {
      // console.log(err)
      // console.log(result)
      res.json(result)
    })
  } else {
    conn.query(sqlQueryBooks, function (err, result) {
      // console.log(err)
      res.json(result)
    })
  }
})

router.post('/sale', function (req, res, next) {
  var sqlViewReportory = $sql.viewReportory
  var callSaleBook =$sql.callSaleBook
  var params = req.body
  // 查看库存是否足够
  conn.query(sqlViewReportory, [params.bookId, params.count], function (err, result) {
    if (!err) {
      if (result.length) {
        // 插入一条销售记录、更新库存信息
        conn.query(callSaleBook, [params.bookId, params.count, new Date(), params.customerName, params.saleAmount], function(err, result){
          res.json(result)
        })
      } else {
        res.json({status: false, message: '库存不足'})
      }
    } else {
      res.json({status: false, message: '发生错误，请重试'})
    }
  })
})

router.post('/return', function (req, res, next) {
  var sqlQuerySaleRecord = $sql.querySaleRecord
  var callReturnBook = $sql.callReturnBook
  var params = req.body
  // console.log(params)
  // 查看该用户是否可以退书
  conn.query(sqlQuerySaleRecord, [params.bookId, params.customerName, params.bookId, params.customerName], function (err, result) {
    if (!err) {
      if (result[0][0].saleTotalCount - result[1][0].returnTotalCount >= params.count) {
        // 插入一条退货记录、更新库存信息
        conn.query(callReturnBook, [params.bookId, params.count, new Date(), params.customerName, params.returnAmount], function(err, result) {
          res.json(result)
        })
      } else {
        res.json({status: false, message: '请输入正确的退货信息！'})
      }
    } else {
      res.json({status: false, message: '发生错误，请重试'})
    }
  })
})

router.post('/getStatistics', function (req, res, next) {
  var querySaleRecordByTime = $sql.querySaleRecordByTime
  var queryPurchaseTableByTime = $sql.queryPurchaseTableByTime
  var queryReturnRecordByTime = $sql.queryReturnRecordByTime
  var params = req.body
  // console.log(params)

  var data = {}
  // 销售情况
  conn.query(querySaleRecordByTime, [params.startTime, params.endTime], function (err, result) {
    if (!err) {
      data['sBook'] = result
      conn.query(queryPurchaseTableByTime, [params.startTime, params.endTime], function (err, result) {
        if (!err) {
          data['pBook'] = result
          conn.query(queryReturnRecordByTime, [params.startTime, params.endTime], function(err, result){
            // console.log(err)
            if(!err){
              data['rBook'] = result
              res.json(data)
            } else {
              res.json({ status: false, message: '发生错误，请重试' })
            }
          })
        } else {
          res.json({ status: false, message: '发生错误，请重试' })
        }
      })
    } else {
      res.json({ status: false, message: '发生错误，请重试' })
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
      res.json({ status: false, message: '发生错误，请重试' })
    }
  })
})

// 进货
router.post('/purchase', function (req, res, next) {
  // console.log(req.body)
  var params = req.body
  var callPurchaseBook = $sql.callPurchaseBook
  conn.query(callPurchaseBook, [params.providerId, params.bookId, new Date(params.purchaseTime), params.purchaseCount, params.purchaseAmount], function(err, result) {
    if (!err) {
      res.json({status: true, message: '购买成功, 请给图书定价'})
    } else {
      res.json({ status: false, message: '发生错误，请重试' })
    }
  })
})

// 更新价格
router.post('/changePrice', function (req, res, next) {
  var params = req.body
  var updateBookPrice = $sql.updateBookPrice
  conn.query(updateBookPrice, [params.price, params.bookId], function (err, result) {
    if (!err) {
      res.json({ status: true, message: '修改成功' })
    } else {
      res.json({ status: false, message: '发生错误，请重试' })
    }
  })
})

// 获取排行榜
router.post('/rankList', function (req, res, next) {
  var queryRankList = $sql.queryRankList
  var params = req.body
  conn.query(queryRankList, [params.startTime, params.endTime], function (err, result) {
    if (!err) {
      // console.log(result)
      res.json(result)
    } else {
      res.json({ status: false, message: '发生错误，请重试'})
    }
  })
})
module.exports = router
