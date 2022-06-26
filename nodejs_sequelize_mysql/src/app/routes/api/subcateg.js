const router = require('express').Router();

const { Subcategory } = require('../../../db');

router.get('/', async (req, res) => {
	const subcategory = await Subcategory.findAll();
	res.json(subcategory);
	//res.send('hello');
});

router.post('/', async (req, res) => {
	const subcategory = await Subcategory.create(req.body);
	console.log(subcategory);
	res.json(subcategory);
});

router.put('/:id', async (req, res) => {
	await Subcategory.update(req.body, {
		where: { id: req.params.id }
	});
	res.json({success: 'MODIFICADO'});
});

router.delete('/:id', async (req, res) => {
	await Subcategory.destroy({
		where: { id: req.params.id }
	});
	res.json({success: 'ELIMINADO'});
});

module.exports = router;
