// Importing Libraries
const Sequelize = require('sequelize');

// Importing Models
const packageModel = require('./models/packages');
const categoryModel = require('./models/categories');
const subcategoryModel = require('./models/subcateg');
const pCatSubModel = require('./models/pcat_sc');

// Connecting to a database, Passing parameters separately
const connection = new Sequelize('soyclara_sequelize_test', 'haru', 'password', {
	host: 'localhost',
	dialect: 'mysql'
});

// Testing the connection
try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const Package = packageModel(connection, Sequelize);
const Category = categoryModel(connection, Sequelize);
const Subcategory = subcategoryModel(connection, Sequelize);
const pCatSub = pCatSubModel(connection, Sequelize);

// Testing tables syncronization
connection.sync({ force: false })
	.then(() => {
		console.log('Tablas Sincronizadas');
	});

// Exporting Models
module.exports = {
	Package, 
	Category,
	Subcategory,
	pCatSub
};
