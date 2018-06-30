var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')
var conn = mysql.createConnection(models.mysql)

// 连接数据库

conn.connect()

module.exports = router