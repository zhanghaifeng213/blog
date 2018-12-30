const mongoose = require('mongoose')
const db = mongoose.createConnection("mongodb://localhost:27017/zhf", { useNewUrlParser: true })
db.on("error", (err) => {
  console.log(err)
})
db.on("open", () => {
  console.log("open")
})
const Schema = mongoose.Schema
const HtmlSchema = new Schema({
  name: String
})
const Html = db.model("man", HtmlSchema)
new Html({ name: "zhf" }).save().then(data => {
  console.log(data)
})