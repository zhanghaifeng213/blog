const Router = require("koa-router")
// 拿到操作user 表的逻辑对象
const user = require('../control/user')
const article = require('../control/article')
const comment = require('../control/comment')
const admin = require("../control/admin")
const upload = require("../util/upload")
const router = new Router
// 设计主页

router.get("/", admin.home)

// 主要用来处理返回  用户登录 用户注册
router.get(/^\/user\/(?=reg|login)/, async (ctx) => {
  // show 为 true 则显示注册   false 显示登录
  const show = /reg$/.test(ctx.path)
  await ctx.render("register", { show })
})
// router.post("/user/login", async (ctx) => {
//   console.log("用户需要登陆")
//   console.log(ctx.request.body)
//   const data = ctx.request.body
//   // 把用户名提出来 ---》 上数据库去查询 ---》
// })

// 注册用户
/**
* @api {post} /user/reg 注册
* @apiName reg
* @apiGroup reg
* @apiDescription 注册用户
* @apiParam (params) {String} username 用户名
* @apiParam (params) {String} password 密码
* @apiHeaderExample {json} Header:
* {
*    Content-Type: application/json; charset=UTF-8
*  }
*
* @apiSuccessExample 成功
* {
    password: "1"，
    username:"aaa"
  }
}
*/
router.post("/user/reg", user.reg)
// 用户登陆
/**
* @api {post} /user/login 登陆
* @apiName login
* @apiGroup login
* @apiDescription 登陆用户
* @apiParam (params) {String} username 用户名
* @apiParam (params) {String} password 密码
* @apiHeaderExample {json} Header:
* {
*    Content-Type: application/json; charset=UTF-8
*  }
*
* @apiSuccessExample 成功
* {
    "status":"success",
    "data":"登陆成功"
  }
*/
router.post("/user/login", user.login)
// 用户退出
/**
* @api {get} /user/logout 登出
* @apiName logout
* @apiGroup logout
* @apiDescription 用户登出
*
*/
router.get("/user/logout", user.logout)
// 获取用户信息
/**
* @api {get} /user/info 用户信息
* @apiName info
* @apiGroup info
* @apiDescription 用户信息
* @apiHeaderExample {json} Header:
* {
*    Content-Type: application/json; charset=UTF-8
*  }
*
* @apiSuccessExample 成功
* {
    "status":"success",
    "data":
      {
        "username":"admin",
        "uid":"5c531dd57b6654308b7a501e",
        "role":"666",
        "avatar":"/avatar/default.jpg"
      }
    }
*/
router.get("/user/info", user.info)
// 文章的发表页面

router.get("/article", user.keepLog, article.addPage)
// 文章添加
/**
* @api {post} /article 文章发表
* @apiName article
* @apiGroup article
* @apiDescription 文章发表
* @apiParam (params) {String} content 文章内容
* @apiParam (params) {String} tips 文章类型
* @apiParam (params) {String} title 文章标题
* @apiHeaderExample {json} Header:
* {
*    Content-Type: application/json; charset=UTF-8
*  }
*
* @apiSuccessExample 成功
* {
    "msg":"发表成功",
    "status":1
  }
*/
router.post("/article", user.keepLog, article.add)
// 文章列表分页路由
/**
* @api {get} /page/:id 文章分页列表
* @apiName articlePage
* @apiGroup articlePage
* @apiDescription 文章分页列表
* @apiHeaderExample {json} Header:
* {
*    Content-Type: application/json; charset=UTF-8
*  }
*
*/
router.get("/page/:id", article.getList)
// 文章详情页，路由
/**
* @api {get} /article/:id 文章详情
* @apiName articleDetail
* @apiGroup articleDetail
* @apiDescription 文章详情
* @apiHeaderExample {json} Header:
* {
*    Content-Type: application/json; charset=UTF-8
*  }
*
*/
router.get("/article/:id", user.keepLog, article.details)
// 发表评论
/**
* @api {post} /comment 发表评论
* @apiName comment
* @apiGroup comment
* @apiDescription 发表评论
* @apiParam (params) {String} article 文章id
* @apiParam (params) {String} content 评论内容
* @apiHeaderExample {json} Header:
* {
*    Content-Type: application/json; charset=UTF-8
*  }
*
* @apiSuccessExample 成功
* {
    "status":1,
    "msg":"评论成功"
  }
*/
router.post("/comment", user.keepLog, comment.save)
// 后台管理文章 评论 上传
router.get("/admin/:id", user.keepLog, admin.index)
// 头像上传功能
/**
* @api {post} /upload 头像上传
* @apiName upload
* @apiGroup upload
* @apiDescription 头像上传
* @apiParam (params) {FormData} file file对象
* @apiHeaderExample {json} Header:
* {
*    Content-Type: form
*  }
*
*/
router.post("/upload", user.keepLog, upload.single("file"), user.upload)
// 获取用户的所以评论
router.get("/user/comments", user.keepLog, comment.comlist)
// 后台 删除用户评论
router.del("/comment/:id", user.keepLog, comment.del)
// 获取用户的所以文章
router.get("/user/articles", user.keepLog, article.artlist)
// 后台：删除用户评论
router.del("/article/:id", user.keepLog, article.del)
router.get("*", async ctx => {
  await ctx.render("404", {
    title: "404"
  })
})
module.exports = router

