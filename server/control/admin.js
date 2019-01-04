const { db } = require("../Schema/config")
const ArticleSchema = require('../Schema/article')
// 去用户的Schema,为了拿到操作users集合的实例对象
const UserSchema = require("../Schema/article")
const User = db.model("user", UserSchema)
// 通过db对象创建操作article数据库模型对象
const Article = db.model("articles", ArticleSchema)
const CommentSchema = require("../Schema/comment")
const Comment = db.model("comments", CommentSchema)

const fs = require('fs')
const { join } = require('path')
exports.index = async ctx => {
  if (ctx.session.isNew) {
    // 没有登陆
    ctx.ststus = 404
    return await ctx.render("404", {
      title: "404"
    })
  }
  const id = ctx.params.id
  const arr = fs.readdirSync(join(__dirname, "../views/admin"))
  let flag = false
  arr.forEach((v) => {
    const name = v.replace(/^(admin\-)|(\.pug)$/g, "")
    if (name === id) {
      flag = true
    }
  })
  if (flag) {
    await ctx.render('./admin/admin-' + id, {
      role: ctx.session.role
    })
  } else {
    ctx.status = 404
    await ctx.render('404', { title: '404' })
  }
}
exports.home=async ctx=>{
  ctx.body=fs.readFileSync('index.html','utf8')
}