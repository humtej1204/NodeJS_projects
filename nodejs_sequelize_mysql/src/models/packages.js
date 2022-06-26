module.exports = (sequelize, type) => {
	return sequelize.define('package', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		name: type.STRING(255),
		description: type.TEXT,
		price: type.FLOAT(7,2)
	});
}
