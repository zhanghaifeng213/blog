const miSend = require('./mi-send')
module.exports = (app) => {
  app.use(miSend())
}