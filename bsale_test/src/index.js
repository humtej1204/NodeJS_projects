const app = require('./config/server');
// Routes
const apiRouter = require('./routes/api');
// DB connection
require('./config/db');

app.listen(app.get('port'), () => {
	console.log('Server on port:', app.get('port'))
});

app.use('/', apiRouter);