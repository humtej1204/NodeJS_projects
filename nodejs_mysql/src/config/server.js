const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
//const sequelize = require('sequelize');
//const MySQLStore = require('express-sequelize-session');
const passport = require('passport');

const { database } = require('../keys');

// Initializations
const app = express();
require('../lib/passport');

//settings
app.set('port', process.env.PORT || 3000);

// HandleBars
app.set('views', path.join(__dirname, '../app/views'));
app.engine('.hbs', exphbs.engine({
	defaultlayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require(path.join(__dirname, '../lib/handlebars'))
}));
app.set('view engine', '.hbs');

// Middleware
app.use(session({
	secret: 'harusession',
	resave: false,
	saveUninitialized: false,
	store: new MySQLStore(database)
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
	app.locals.user = req.user;
	next();
});

// Routes
app.use(require('../app/routes'));
app.use(require('../app/routes/authentication'));
app.use(require('../app/routes/categories'));
app.use(require('../app/routes/index'));
app.use('/add', require('../app/routes/packages'));
app.use('/add', require('../app/routes/categories'));
app.use('/add', require('../app/routes/subcateg'));

// Public
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
