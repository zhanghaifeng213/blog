// const Article = require("../Models/article")
// const User = require("../Models/user")
// const Comment = require("../Models/comment")
// exports.addPage = async (ctx) => {
//   await ctx.render("add-article", {
//     title: "文章发表页",
//     session: ctx.session
//   })
// }

// // 文章发表页 （保存到数据库）
// exports.add = async ctx => {
//   if (ctx.session.isNew) {
//     // true就没登陆 就不需要查询数据库
//     return ctx.body = {
//       msg: "用户未登录",
//       status: 0
//     }
//   }
//   // 用户登陆的情况
//   // 用户登陆情况下，post发过来的数据
//   const data = ctx.request.body
//   // ? title ? content ? tips ? author
//   data.author = ctx.session.uid
//   data.commentNum = 0
//   // new Article(data)
//   //   .save()
//   //   .then(res => {

//   //   })
//   await new Promise((resolve, reject) => {
//     new Article(data).save((err, data) => {
//       if (err) return reject(err)
//       User.update({ _id: data.author }, { $inc: { articleNum: 1 } }, err => {
//         if (err) return console.log(err)
//         console.log("文章保存成功")
//       })
//       resolve(data)
//     })
//   })
//     .then(data => {
//       ctx.body = {
//         msg: "保存成功",
//         status: 1
//       }
//     })
//     .catch(err => {
//       ctx.body = {
//         msg: "发表失败",
//         status: 0
//       }
//     })
// }

// exports.getList = async ctx => {
//   // 查询每篇文章的作者头像
//   // id ctx.params.id
//   let page = ctx.params.id || 1
//   page--
//   const maxNum = await Article.estimatedDocumentCount((err, data) => err ? console.log(err) : data)
//   const artList = await Article
//     .find()
//     .sort('-created')
//     .skip(5 * page)
//     .limit(5)
//     // 拿到了5条数据
//     .populate({
//       path: "author",
//       select: "username _id avatar"
//     }) // mongoose 用于连表查询
//     .then(data => data)
//     .catch(err => console.log(err))

//   console.log('artList')
//   console.log(artList)
//   await ctx.render("index", {
//     session: ctx.session,
//     title: "博客首页",
//     artList,
//     maxNum
//   })
// }

// // 文章详情
// exports.details = async ctx => {
//   // 取动态路由的id
//   const _id = ctx.params.id
//   const article = await Article
//     .findById(_id)
//     .populate("author", "username")
//     .then(data => data)
//   const comment = await Comment
//     .find({ article: _id })
//     .sort("-created")
//     .populate("from", "username avatar")
//     .then(data => data)
//     .catch(err => {
//       console.log(err)
//     })
//   await ctx.render("article", {
//     title: article.title,
//     article,
//     comment,
//     session: ctx.session
//   })
// }
// // 返回用户所有文章
// exports.artlist = async ctx => {
//   const uid = ctx.session.uid
//   const data = await Article.find({ author: uid })
//   ctx.body = {
//     code: 0,
//     count: data.length,
//     data
//   }
// }

// // 删除对应 id 的文章
// exports.del = async ctx => {
//   const _id = ctx.params.id

//   let res = {
//     state: 1,
//     message: "成功"
//   }

//   await Article.findById(_id)
//     .then(data => data.remove())
//     .catch(err => {
//       res = {
//         state: 0,
//         message: err
//       }
//     })

//   ctx.body = res
// }
// // 删除对应id的文章
// // exports.del = async ctx => {
// //   const articleId = ctx.params.id
// //   // const uid = ctx.session.uid
// //   // 用户的articleNum -= 1
// //   // 删除文章对应的评论
// //   // 被删除评论对应的用户表里的commentNum -=1
// //   // 删除文章
// //   let uid
// //   let res = {}
// //   await Article.deleteOne({ _id }).exec(async err => {

// //     if (err) {
// //       res = {
// //         state: 0,
// //         message: "删除失败"
// //       }
// //     } else {
// //       await Article.findById({ _id }, (err, data) => {
// //         if (err) return console.log(err)
// //         uid = data.author
// //       })
// //     }
// //   })
// //   await User.update({ _id: uid }, { $inc: { articleNUm: -1 } })
// //   // 删除所有评论
// //   await Comment.find({
// //     article: _id
// //   }).then(async data => {
// //     // data => array
// //     let len = data.length
// //     let i = 0
// //     async function deleteUser() {
// //       if (i >= len) return
// //       const cId = data[i]._id
// //       await Comment.deleteOne({ _id: cId }).then(data => {
// //         User.update({ _id: data[i].from }, { $inc: { commentNum: -1 } }, err => {
// //           if (err) return console.log(err)
// //           i++
// //         })
// //       })
// //     }
// //     await deleteUser()
// //     res = {
// //       state: 1,
// //       message: "成功"
// //     }
// //   })

// //   ctx.body = {
// //     state: 1,
// //     message: "成功"
// //   }
// // }

const Article = require('../Models/article')
const User = require('../Models/user')
const Comment = require('../Models/comment')

// 返回文章发表页
exports.addPage = async ctx => {
  await ctx.render('add-article', {
    title: '文章发表页',
    session: ctx.session
  })
}

// 文章的发表（保存到数据库）
exports.add = async ctx => {
  if (ctx.session.isNew) {
    // true 就没登录   就不需要就查询数据库
    return (ctx.body = {
      msg: '用户未登录',
      status: 0
    })
  }

  // 用户登录的情况：
  // 这是用户在登录情况下，post 发过来的数据
  const data = ctx.request.body
  // 添加文章的作者
  data.author = ctx.session.uid
  data.commentNum = 0

  await new Promise((resolve, reject) => {
    new Article(data).save((err, data) => {
      if (err) return reject(err)
      // 更新用户文章计数
      User.update({ _id: data.author }, { $inc: { articleNum: 1 } }, err => {
        if (err) return console.log(err)
        console.log('文章保存成功')
      })

      console.log(data.author)
      resolve(data)
    })
  })
    .then(data => {
      ctx.body = {
        msg: '发表成功',
        status: 1
      }
    })
    .catch(err => {
      ctx.body = {
        msg: '发表失败',
        status: 0
      }
    })
}

// 获取文章列表
exports.getList = async ctx => {
  // 查询每篇文章对应的作者的头像
  // id ctx.params.id
  let page = ctx.params.id || 1
  page--

  const maxNum = await Article.estimatedDocumentCount((err, num) =>
    err ? console.log(err) : num
  )

  const artList = await Article.find()
    .sort('-created')
    .skip(5 * page)
    .limit(5)
    //拿到了5条数据
    .populate({
      path: 'author',
      select: '_id username avatar'
    }) // mongoose 用于连表查询
    .then(data => data)
    .catch(err => console.log(err))

  // await ctx.render("index", {
  //   session: ctx.session,
  //   title: "实战博客首页",
  //   artList,
  //   maxNum,
  // })
  await ctx.send({
    session: ctx.session,
    title: '实战博客首页',
    artList,
    maxNum
  })
  // await ctx.render("index", {})
}

// 文章详情
exports.details = async ctx => {
  // 去动态路由的里的 id
  const _id = ctx.params.id

  // 查找文章本身数据
  const article = await Article.findById(_id)
    .populate('author', 'username')
    .then(data => data)

  // 查找跟当前文章关联的所有评论

  const comment = await Comment.find({ article: _id })
    .sort('-created')
    .populate('from', 'username avatar')
    .then(data => data)
    .catch(err => {
      console.log(err)
    })

  await ctx.send({
    title: article.title,
    article,
    comment,
    session: ctx.session
  })
}

// 返回用户所有文章
exports.artlist = async ctx => {
  const uid = ctx.session.uid

  const data = await Article.find({ author: uid })

  ctx.body = {
    code: 0,
    count: data.length,
    data
  }
}

// 删除对应 id 的文章
exports.del = async ctx => {
  const _id = ctx.params.id

  let res = {
    state: 1,
    message: '成功'
  }

  await Article.findById(_id)
    .then(data => data.remove())
    .catch(err => {
      res = {
        state: 0,
        message: err
      }
    })

  ctx.body = res
}
