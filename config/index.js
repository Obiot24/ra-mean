module.exports = {
	APLICATION_NAME : 'ra-mongo',
	port: process.env.PORT || 8000,
	db: process.env.MONGODB_URI || 'mongodb://localhost:27017/ra',
	SECRET_TOKEN : 'supersecretotoken'
}