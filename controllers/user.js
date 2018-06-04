'use strict'

const User = require('../models/user')
const serviceAuth = require('../services/auth')

function signUp(req, res) {

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        password: req.body.password
    }) 
    
    user.save((err) => {
        if (err) return res.status(500).send({
            message: `Error al crear el usuario: ${err}`
        })

        return res.status(201).send({
            token: serviceAuth.createToken(user)
        })
    })
}

function signIn(req, res) {

    var data;
    
    if (req.body.email) { data = { email: req.body.email } }
    else if (req.body.username) { data = { username: req.body.username } }
    
    User.findOne( data , (err, user) => {        
        if (err) return res.status(500).send({
            error: err
        })
        if (!user) return res.status(404).send({
            error: 'No existe el usuario'
        })

        user.comparePassword(req.body.password, (err, match) => {
            if (match && !err) {
                req.user = user
                res.status(200).send({
                    message: 'Te has logueado correctamente',
                    token: serviceAuth.createToken(user)
                })
            }else{
                return res.status(404).send({
                    error: 'Contraseña equivocada'
                })
            }
        });
    })
}

module.exports = {
    signUp,
    signIn
}