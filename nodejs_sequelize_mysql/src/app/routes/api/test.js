const router = require('express').Router();

const { Package } = require('../../../db');

router.get('/', async (req, res) => {
	const packge = await Package.findAll();
	res.json(packge);
	//res.send('hello');
});

router.post('/', async (req, res) => {
	const packge = await Package.create(req.body);
	console.log(packge);
	res.json(packge);
});

router.put('/:id', async (req, res) => {
	await Package.update(req.body, {
		where: { id: req.params.id }
	});
	res.json({success: 'MODIFICADO'});
});

router.delete('/:id', async (req, res) => {
	await Package.destroy({
		where: { id: req.params.id }
	});
	res.json({success: 'ELIMINADO'});
});

module.exports = router;
