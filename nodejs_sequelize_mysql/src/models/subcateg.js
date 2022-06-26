module.exports = (sequelize, type) => {
    return sequelize.define('subcategory', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: type.STRING(255)
    });
}
