const Koa = require('koa')
const app = new Koa()

const word = require('./routes/word.js')

app.use(word.routes(), word.allowedMethods())

app.use(async (ctx) => {
    ctx.body = "Liting's api server"
})

module.exports = app
