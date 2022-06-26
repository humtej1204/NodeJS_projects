const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const middlewares = require('../middlewares');

const { User } = require('../../../db');

router.get('/', async (req, res) => {
	const user = await User.findAll();
	res.json(user);
	//res.send('hello');
});

router.post('/register', async (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, 10)
	const user = await user.create(req.body);
	console.log(user);
	res.json(user);
});

router.post('/login', async (req, res) => {
	const user = await User.findOne({
		where: { email: req.body.email }
	});
	if (user) {
		const compair = bcrypt.compareSync(req.body.password, user.password);
		if (compair) {
			const token = middlewares.createToken(user);
			res.cookie("token", token, { maxAge: 3000 });
			res.header('authorization', token).json({
				message: 'USUARIO AUTENTICADO',
				token: token
			});
			res.json({ success: token });
			res.end();
		} else {
			res.json({ error: 'Contraseña INCORRECTA' });
		}
	} else {
		res.json({ error: 'Error de USUARIO y/o Contraseña' });
	}
});

router.put('/:id', async (req, res) => {
	await User.update(req.body, {
		where: { id: req.params.id }
	});
	res.json({success: 'MODIFICADO'});
});

router.delete('/:id', async (req, res) => {
	await User.destroy({
		where: { id: req.params.id }
	});
	res.json({success: 'ELIMINADO'});
});

module.exports = router;
