const fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
// 路由加载
var mount = require('mount-routes')

var app = express()
if (process.env.NODE_ENV !== 'production') {
  const swaggerJSDoc = require('swagger-jsdoc')
  const swaggerUi = require('swagger-ui-express')

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'express API for vue_shop',
        version: '1.0.0',
        description: 'A simple express API for vue_shop project'
      },
      servers: [
        {
          url: 'http://localhost:8888',
          description: 'Development server'
        }
      ]
    },
    apis: ['./routes/api/private/v1/*.js'] // files containing annotations as above
  }
  const swaggerSpec = swaggerJSDoc(options)

  // 设置 swagger 文档路由
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

/**
 * 公共系统初始化
 *  parse application/json
 *  parse application/x-www-form-urlencoded
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 初始化数据库模块
var database = require('./modules/database')
database.initialize(app, function (err) {
  if (err) {
    console.error('连接数据库失败失败 %s', err)
  }
})

/**
 * 后台管理系统初始化
 */
// 获取管理员逻辑模块
var managerService = require(path.join(process.cwd(), 'services/ManagerService'))
// 获取角色服务模块
var roleService = require(path.join(process.cwd(), 'services/RoleService'))

// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') res.send(200)
  /* 让options请求快速返回 */ else next()
})

// 初始化统一响应机制
var resExtra = require('./modules/resExtra.js')
app.use(resExtra)

// 初始化 后台登录 passport 策略
adminPassport = require('./modules/passport')
// 设置登录模块的登录函数衔接 passport 策略
adminPassport.setup(app, managerService.login) // 把登录绑定到 passport, 把 passport 初始化到 app.use 中
// 设置 passport 登录入口点
app.use('/api/private/v1/login', adminPassport.login) // 调用 passport local 策略, 验证用户名和密码,成功后生成token 返回
// 设置 passport 验证路径
app.use('/api/private/v1/*', adminPassport.tokenAuth) // 调用 passport bearer 策略, 验证token, 成功后把用户信息放到 req.userInfo 中

// 获取验证模块
var authorization = require(path.join(process.cwd(), '/modules/authorization'))
// 设置全局权限, 这种回调式的逻辑组织方法, 已经是很老的方式了, 现在推荐使用 async/await, 以及中间的过度形式, promise 调用链
authorization.setAuthFn(function (req, res, next, serviceName, actionName, passFn) {
  if (!req.userInfo || isNaN(parseInt(req.userInfo.rid))) return res.sendResult('无角色ID分配')
  // 验证权限
  roleService.authRight(req.userInfo.rid, serviceName, actionName, function (err, pass) {
    if (err) {
      return res.sendResult(null, 500, '权限验证出错')
    }
    passFn(pass)
  })
})

/**
 * 初始化路由
 */
// 带路径的用法并且可以打印出路由表
mount(app, path.join(process.cwd(), '/routes'), true)

app.all('/ueditor/ue', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') res.send(200)
  /* 让options请求快速返回 */ else next()
})

// 富文本编辑器上传
var ueditor = require(path.join(process.cwd(), '/modules/ueditor'))
// 富文本控件处理qing q
app.use('/ueditor/ue', ueditor)
// . 设置富文本空间地址
app.use('/ueditor', express.static('public/ueditor'))
app.use('/tmp_uploads', express.static('tmp_uploads'))
app.use('/x/common', express.static('uploads/common'))
app.use('/uploads/goodspics', express.static('uploads/goodspics'))

var uploadConfig = require('config').get('upload_config')
app.use('/' + uploadConfig.get('upload_ueditor'), express.static(uploadConfig.get('upload_ueditor')))

const logistics = require('./modules/Logistics.js')
app.get('/api/private/v1/kuaidi/:orderno', logistics.getLogisticsInfo)

// 普通中间件是'流水线工人'，做完自己的活就递给下一个人。
// express.static 是'仓库管理员'，如果有人要的东西（文件）在仓库里有，他就直接拿给人家，交易结束；如果没有，他就让这个人去别处问问（调用 next()）。
// multer 是'收货员'，他把收到的货物（文件）登记好、放好，然后把登记单（req.file）交给下一个处理人（路由处理器）。
// 定义日志
// var log4js = require('./modules/logger');
// log4js.use(app);

/**
 *
 * 统一处理无响应
 *
 */
// 如果没有路径处理就返回 Not Found
app.use(function (req, res, next) {
  res.sendResult(null, 404, 'Not Found')
})

app.listen(8888)

module.exports = app
