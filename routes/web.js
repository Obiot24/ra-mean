'use strict'

const express = require('express')
const web = express.Router()
const path = require('path')

// GET / 
// web.get('*', (req, res) => {
//     res.sendFile(path.resolve('./dist/index.html'))
// })

web.get('/', (req,res)=>{
    res.send("LOL")
})

module.exports = web