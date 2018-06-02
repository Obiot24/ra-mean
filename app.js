'use strict'

let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let api = require('./routes/api')
let web = require('./routes/web')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)
app.use('/', web)

if (module.hot) {
    module.hot.accept();
}

module.exports = app