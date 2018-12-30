const { Schema } = require("./config")
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  content: String,
  from: {
    type: ObjectId,
    ref: "users"
  },
  article: {
    type: ObjectId,
    ref: "articles"
  }
}, { versionKey: false, timestamps: { createdAt: "created" } })

CommentSchema.post("remove", (doc) => {
  const Article = require('../Models/article')
  const User = require('../Models/user')
  const { from, article } = doc
  Article.updateOne({ _id: article }, {
    $inc: {
      commentNum: -1
    }
  }).exec()
  User.updateOne({ _id: from }, {
    $inc: {
      commentNum: -1
    }
  }).exec()
})


module.exports = CommentSchema