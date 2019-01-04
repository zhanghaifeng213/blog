const Koa = require("koa")
const static = require("koa-static")
const views = require("koa-views")
const router = require("./routers/router")
const logger = require("koa-logger")
const body = require("koa-body")
const { join } = require("path")
const session = require("koa-session")
// 生成 Koa 实例
const app = new Koa
// 中间件
const middleware = require('./middleware')
middleware(app)
app.keys = ["大帅比"]
// session 的配置对象
const CONFIG = {
  key: "Sid",
  maxAge: 36e5,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true
}
// 注册日志模块
app.use(logger())
// 注册session
app.use(session(CONFIG, app))
// 配置koa-body处理post请求数据
app.use(body())
// 配置静态资源目录
app.use(static(join(__dirname, "public")))
// 配置视图模板
app.use(views(join(__dirname, "views"), {
  extension: "pug"
}))
// 注册路由信息
app.use(router.routes()).use(router.allowedMethods())
app.listen(6000, () => {
  console.log("项目启动成功，监听在6000端口")
})

// 创建管理员用户 如果管理员用户已存在 则返回
{
  const { db } = require('./Schema/config')
  const UserSchema = require('./Schema/user')
  const encrypt = require('./util/encrypt')
  const User = db.model('users', UserSchema)
  User.find({ username: "admin" }).then(data => {
    if (data.length === 0) {
      new User({
        username: "admin",
        password: encrypt("admin"),
        role: 666,
        commentNum: 0,
        articleNum: 0
      }).save().then(data => {
        console.log("管理员用户名 -> admin,密码 -> admin")
      }).catch(err => {
        console.log("管理员账号检查失败")
      })
    } else {
      console.log('管理员用户名:admin  密码 -> admin')
    }
  })
}