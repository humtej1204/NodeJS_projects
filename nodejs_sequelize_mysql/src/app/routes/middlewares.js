const jwt = require('jsonwebtoken');

const createToken = (user) => {
	const payload = {
		userId: user.username,
		userPassword: user.password
	}

	return jwt.sign(payload, 'SECRET', {expiresIn: '5m'});
}

const validateToken = (req, res, next) => {
	const token = req.headers['authorization'];
	//const token = req.cookies.token;

	if (!token) {
		res.send('ACCESS DENIED');
	}

	jwt.verify(token, 'SECRET', (err, user) => {
		if (err) {
			res.send('ACCESS DENIED, Token Expired or Incorrect');
		} else {
			next();
		}
	});
}

module.exports = {
	createToken,
	validateToken
}
