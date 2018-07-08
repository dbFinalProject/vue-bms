// node 后端服务器

// 引入编写好的api
const userApi = require('./api/userApi')
const bookApi = require('./api/bookApi')
var cookieParser = require('cookie-parser')

// 引入文件模块
const fs = require('fs')
// 引入处理路径模块
const path = require('path')
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');
// 引入Express
const express = require('express')
const app = express()

// 引入session模块
const session = require('express-session')
var FileStore = require('session-file-store')(session)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 静态文件目录
app.use('/server/uploads', express.static(path.join(__dirname, 'uploads')))
var sessionConfig = {
  name: 'bms',
  secret: 'bms',
  cookie: { maxAge: 60 * 60 * 1000 * 24 },
  store: new FileStore(),
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionConfig))

app.get('/api/user/login', (req, res, next) => {
  //console.log(req)
  if(req.session.loginUser){
    sessionConfig.store.get(req.sessionID, function (err, doc) {
      if (err) {
        res.json({ status: false })
      } else if (doc && doc.loginUser === req.session.loginUser) {
        res.json({ status: true })
      } else {
        res.json({ status: false })
      }
    })
  }else{
    res.json({ status: false })
  }
})

app.get('/api/user/logout', (req, res, next) => {
  sessionConfig.store.destroy(req.sessionID, function(err) {
    if(err){
      res.json({ status: false, message: "退出失败" })
    } else {
      req.session.destroy(function (err) {
        if(err){
          res.json({ status: false, message: "退出失败" })
        } else {
          res.clearCookie(sessionConfig.name)
          res.json({ status: true, message: "退出成功" })
        }
      })
    }
  })
})

// 跨域支持
app.all('*', (req, res, next) => {
  const origin = req.headers.origin
  // console.log(origin)
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token,sign')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
  next()
})

// 后端api路由
/*
*   /api/user 处理登陆、注册
*   /api/manager 图书销售部分路由
*   /api/customer 用户部分路由
*/
app.use('/api/user', userApi)
app.use('/api/book', bookApi)
//app.use('/api/manager', managerApi)

// 访问静态资源文件，这里是访问所有dist目录下的静态资源文件
// ...

// 监听3000端口
app.listen(3000)
console.log('The server has successfully opened......')
