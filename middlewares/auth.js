'use strict'

const User = require('../models/user')
const serviceAuth = require('../services/auth')

const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'No tienes autorización'
        })
    }else{
    const token = req.headers.authorization.split(' ')[1]
    serviceAuth.decodeToken(token)
        .then(response => {
            req.user = response            
            next()
        })
        .catch(response => {     
            return res.status(response.status).send(response.message)
        })
    }
}

const roleAuthorization = function(roles){ 
    return function(req, res, next){ 
        //ACA PUEDE CAMBIAR DEPENDIENDO EL TOKEN "COMO ALMACENE LOS DATOS"
        var user = req.user; 
        User.findById(user, function (err, userQ) {
            if (err || userQ == null) {
                res.status(401).json({
                    error: 'No user found.'
                });
                return next('Unauthorized');
            } 
            if (roles.indexOf(userQ.role) > -1) {
                return next();
            } 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized'); 
        }); 
    }
} 

module.exports = {
    isAuth,
    roleAuthorization
}