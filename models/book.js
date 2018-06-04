'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = Schema ({
    title: String,
    page: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
})

module.exports = mongoose.model('Book', BookSchema)