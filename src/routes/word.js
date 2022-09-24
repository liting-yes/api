const Router = require('@koa/router')
const router = new Router()
const responseStatus = require('../utils/responseStatus.js')
const random = require('../utils/random.js')
const glob = require('glob')
const fs = require('fs')
const path = require('path')

let wordDb = {}

glob('db/**/*.json', (err, files) => {
    files.forEach(file => {
        fs.readFile(path.resolve(__dirname, '..', file), 'utf-8', (err, data) => {
            const dataObj = JSON.parse(data)
            wordDb = { ...wordDb, ...dataObj }
        })
    })
})

router.get('/word', ctx => {
    const query = ctx.query
    if (Object.keys(query).length === 0) {
        ctx.body = {
            status: responseStatus.queryError,
            data: null
        }
    } else if (query.type === 'aphorism') {
        const aphorismDb = wordDb.aphorism ?? []
        ctx.body = {
            status: responseStatus.success,
            data: aphorismDb[random.randomNumber(0, aphorismDb.length)] ?? null
        }
    } else if (query.type === 'idiom') {
        // type idiom has subclass
        const idiomDb = Object.keys(wordDb.idiom).reduce((db, key) => db.concat(wordDb.idiom[key]), [])
        ctx.body = {
            status: responseStatus.success,
            data: idiomDb[random.randomNumber(0, idiomDb.length)] ?? null
        }
    } else if (query.type === 'poetry') {
        const poetryDb = wordDb.poetry ?? []
        ctx.body = {
            status: responseStatus.success,
            data: poetryDb[random.randomNumber(0, poetryDb.length)] ?? null
        }
    } else {
        ctx.body = {
            status: responseStatus.queryError,
            data: null
        }
    }
})

module.exports = router