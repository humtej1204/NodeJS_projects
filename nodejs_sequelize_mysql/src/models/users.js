module.exports = (sequelize, type) => {
	return sequelize.define('user', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement:true
		},
		username: type.STRING(30),
		email: type.STRING(100),
		password: type.STRING(255)
	});
}
