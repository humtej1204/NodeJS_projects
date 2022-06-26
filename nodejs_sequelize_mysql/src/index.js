const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")

// Import API route
const apiRouter = require('./app/routes/api');

const app = express();

require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api', apiRouter);

app.listen(3000, () => {
	console.log('Servidor Started')
});
