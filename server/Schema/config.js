const mongoose = require('mongoose')
// 阿里云服务器
// mongodb://localhost:52017/blogproject
const db = mongoose.createConnection('mongodb://localhost:27030/blogproject2', {
  useNewUrlParser: true
})
// 用原生 ES6的promise代替mongoose 自实现的promise
mongoose.Promise = global.Promise
// 把mongoose的schema取出来
const Schema = mongoose.Schema
db.on('error', () => {
  console.log('连接数据库失败')
})
db.on('open', () => {
  console.log('连接blogproject数据库成功')
})
module.exports = {
  db,
  Schema
}
