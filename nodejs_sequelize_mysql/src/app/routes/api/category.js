const router = require('express').Router();

const { Category } = require('../../../db');

router.get('/', async (req, res) => {
	const category = await Category.findAll();
	res.json(category);
	//res.send('hello');
});

router.post('/', async (req, res) => {
	const category = await Category.create(req.body);
	console.log(category);
	res.json(category);
});

router.put('/:id', async (req, res) => {
	await Category.update(req.body, {
		where: { id: req.params.id }
	});
	res.json({success: 'MODIFICADO'});
});

router.delete('/:id', async (req, res) => {
	await Category.destroy({
		where: { id: req.params.id }
	});
	res.json({success: 'ELIMINADO'});
});

module.exports = router;
