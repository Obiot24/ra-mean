'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const UserSchema = Schema ({
    username: { type: String, require:true},
    email: { type: String , require: true},
    name: String,
    lastname: String,
    password: { type: String, minlength: 8 },
    salt: String,
    role: { type: Number, default: 1 },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book'}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
})

UserSchema.virtual("full_name").get( () => {
    return this.name + " " + this.lastname
}).set( (full_name) => {
    var words = full_name.split(" ");
    this.name = words[0];
    this.lastname = words[1];
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

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => callback(err, isMatch));
};

module.exports = mongoose.model('User', UserSchema)