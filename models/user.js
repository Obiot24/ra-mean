'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const UserSchema = Schema ({
    name: String,
    lastname: String,
    password: String,
    salt: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
})

UserSchema.pre('save', function (next) {
    let user = this
    bcrypt.genSalt(10, function (err, salt) {       
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.salt = salt
            user.password = hash
            next()
        });
    });

});

module.exports = mongoose.model('User', UserSchema)