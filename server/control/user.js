// const Article = require("../Models/article")
const User = require("../Models/user")
// const Comment = require("../Models/comment")
const encrypt = require('../util/encrypt')

// 用户注册
exports.reg = async (ctx) => {
  console.log("这是处理用户注册的中间件")
  // 用户注册时发过来的数据
  const user = ctx.request.body
  const username = user.username
  const password = user.password
  // 注册时 应该干嘛 以下操作假如格式符合
  // 1.去数据库user先查询当前发过来的username 是否存在
  await new Promise((resolve, reject) => {
    User.find({ username }, (err, data) => {
      console.log("查询数据库username：" + data)
      if (err) {
        return reject(err)
      }
      // 数据库查询没出错？还有可能没有数据
      if (data.length !== 0) {
        // 查询数据库 ---》 用户名已经存在
        console.log("查询数据库 ---》 用户名已经存在")
        resolve("")
        return
      }
      // 用户名不存在，存到数据库
      // 保存到数据库之前需要先加密，encrypt模块是自定义加密模块
      const _user = new User({
        username,
        password: encrypt(password),
        commentNum: 0,
        articleNum: 0
      })
      _user.save((err, data2) => {
        console.log("data2:" + data2)
        if (err) {
          reject(err)
        } else {
          resolve(data2)
        }
      })
    })
  })
    .then(async data => {
      console.log('data: ' + data)
      if (data) {
        // 注册成功
        console.log("注册成功")
        // await ctx.render("isOK", {
        //   status: "注册成功"
        // })
        await ctx.send({
          status: 'success',
          data: '注册成功'
        })
      } else {
        // 用户名已存在
        console.log("用户名已存在")
        // await ctx.render("isOK", {
        //   status: "用户名已存在"
        // })
        await ctx.send({
          status: 'fail',
          data: '用户名已存在'
        })
      }
    })
    .catch(async err => {
      await ctx.render("isOK", {
        status: "注册失败，请重试"
      })
    })
}

exports.login = async ctx => {
  const user = ctx.request.body
  const username = user.username
  const password = user.password
  await new Promise((resolve, reject) => {
    User.find({ username }, (err, data) => {
      if (err) return reject(err)
      if (data.length === 0) return reject('用户名不存在')
      // 把用户传过来密码加密跟数据库比对
      if (data[0].password === encrypt(password)) {
        return resolve(data)
      }
      resolve("")
    })
  })
    .then(async data => {
      if (!data) {
        // return ctx.render('isOK', {
        //   status: "密码不正确，登陆失败"
        // })
        return await ctx.send({
          status: 'fail',
          data: '密码不正确，登陆失败'
        })
      }
      // 让用户在他的 cookie 里设置 username password 加密后的权限
      ctx.cookies.set("username", username, {
        domain: "localhost",
        path: "/",
        maxAge: 36e5,
        httpOnly: false, // 不让客户端访问这个cookie
        overwrite: false,
        signed: true
      })
      // 用户在数据库的_id 值
      ctx.cookies.set("uid", data[0]._id, {
        domain: "localhost",
        path: "/",
        maxAge: 36e5,
        httpOnly: false, // 不让客户端访问这个cookie true不可访问 false 可以访问
        overwrite: true,
        signed: true
      })
      ctx.session = {
        username,
        uid: data[0]._id,
        avatar: data[0].avatar,
        role: data[0].role
      }
      // await ctx.render("isOK", {
      //   status: "登陆成功"
      // })
      await ctx.send({
        status: 'success',
        data: '登陆成功'
      })
    })
    .catch(async err => {
      // await ctx.render("isOK", {
      //   status: "登陆失败qqq"
      // })
      await ctx.send({
        status: 'fail',
        data: '登陆失败qqq'
      })
    })
}


// 确定用户状态， 保持用户的状态
exports.keepLog = async (ctx, next) => {
  if (ctx.session.isNew) { // session没有
    if (ctx.cookies.get('username')) {
      let uid = ctx.cookies.get('uid')
      const avatar = await User.findById(uid)
        .then(data => {
          data.avatar
        })
      ctx.session = {
        username: ctx.cookies.get('username'),
        uid: ctx.cookies.get('uid')
      }
    }

  }
  await next()
}

// 确定用户状态， 保持用户的状态
exports.info = async (ctx) => {
  if (ctx.cookies.get('username') === ctx.session.username) {
    const info = {
      username: ctx.session.username,
      uid: ctx.session.uid,
      role: ctx.session.role
    }
    let uid = ctx.cookies.get('uid')
    await User.findById(uid)
      .then(data => {
        info.avatar = data.avatar
      })
    await ctx.send({
      status: 'success',
      data: info
    })
  } else {
    await ctx.send({
      status: 'fail',
      data: '请重新登陆'
    })
  }
}

exports.logout = async ctx => {
  ctx.session = null
  ctx.cookies.set("username", null, {
    maxAge: 0
  })
  ctx.cookies.set("uid", null, {
    maxAge: 0
  })
  // 在后台重定向到跟页面
  ctx.redirect("/")
}

exports.upload = async ctx => {
  const filename = ctx.req.file.filename
  let data = {}
  await User.update({
    _id: ctx.session.uid
  }, {
      $set: {
        avatar: "/avatar/" + filename
      }
    }, (err, res) => {
      if (err) {
        data = {
          status: 0,
          message: err
        }
      } else {
        data = {
          status: 1,
          message: "上传成功"
        }
      }
    })
  ctx.body = data
}

