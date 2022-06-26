module.exports = (sequelize, type) => {
    return sequelize.define('pCatSub', {
        package_id: {
            type: type.INTEGER,
			model: 'package',
			key: 'id'
        },
		category_id: {
			type: type.INTEGER,
			model: 'category',
			key: 'id'
		},
		subcategory_id: {
			type: type.INTEGER,
			model: 'subcategory',
			key: 'id'
		}
    });
}
