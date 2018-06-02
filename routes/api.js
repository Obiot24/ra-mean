'use strict'

//AUTHENTICATION 
const auth = require('../middlewares/auth')

//EXPRESS ROUTER 
//DOCUMENTATION ON http://expressjs.com/en/guide/routing.html
const express = require('express')
const api = express.Router()

api.get('/private', auth, (req, res) => {
    res.status(200).send({
        message: 'Tienes acceso'
    })
})

const userCtrl = require('../controllers/user')
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

//GET     controller/ controller.index
//POST    controller/ controller.create
//GET     controller/:id  controller.show
//PUT     controller/:id  controller.update
//DELETE  controller/:id  controller.delete

//HOME CONTROLLER
// const HomeCtrl = require('../controllers/home')
// api.get(['/', '/Home'], passport.authenticate('jwt', {
//     session: false
// }), HomeCtrl.index)

module.exports = api
