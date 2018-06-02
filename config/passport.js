const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./index.js')
const models  = require('../models').db

module.exports = (passport) => {
	var opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
	opts.secretOrKey = config.SECRET_TOKEN
	passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
		
		//CAMBIAR A MONGODB
		// models.session.findOne({ where: {idsession: jwt_payload.idsession,hash: jwt_payload.hash, state: true}, include: [models.user] }).then( (session) => {
		// 	if (!session) {
		// 		done(null,false)
		// 	}else{
		// 		sessionjwt = {
		// 			idsession: session.idsession,
		// 			iduser: session.user.iduser,
		// 			rol: session.user.rol,
		// 			email: session.user.email
		// 		}
		// 		done(null,sessionjwt)
		// 	}

		// })
		
	}));
};
