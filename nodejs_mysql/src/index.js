const app = require('./config/server');

// start server
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'))
})
