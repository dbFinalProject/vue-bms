// node 后端服务器

// 引入编写好的api
const userApi = require('./api/userApi')
const bookApi = require('./api/bookApi')
const managerApi = require('./api/managerApi')
var cookieParser = require('cookie-parser');

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
var FileStore = require('session-file-store')(session);
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 静态文件目录
app.use('/server/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(session({
  name: 'bms',
  secret: 'bms',
  cookie: { maxAge: 60 * 60 * 1000 },
  store: new FileStore(),
  resave: false,
  saveUninitialized: true
}))

// app.use((req, res, next) => {
//   // 如果cookie中存在，则说明已经登录
//   if (req.session.user) {
//     res.locals.user = {
//       uid: req.session.user.uid,
//       username: req.session.user.username,
//       userright: req.session.user.userright
//     }
//   } else {
//     res.locals.user = {}
//   }
//   next()
// })

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
