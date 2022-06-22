const express = require('express');
const router = express.Router();

const pool = require('../../config/dbConnection');
const { isLoggedIn } = require('../../lib/auth');

router.get('/packages', isLoggedIn, async (req, res) => {
	const list_subcateg = await pool.query('SELECT * FROM subcateg');
	res.render('add/packages', {list_subcateg: list_subcateg});
});

router.post('/packages', async (req, res) => {
	const { name, description, price, subcateg } = req.body;
	const newPack = {
		name,
		description,
		price
	};
	const subcatPack = { subcateg };
	await pool.query('INSERT INTO packages SET ?', [newPack]);
	const pack = await pool.query('SELECT * FROM packages WHERE name = ?', [newPack.name]);
	if (subcateg) {
		const elem = {
			package_id: parseInt(pack[0].id),
			subcateg_id: parseInt(subcateg)
		};
		await pool.query('INSERT INTO pack_subcat SET ?', [elem]);
	}
	res.redirect('/add/packages_added');
});

router.get('/packages_added', isLoggedIn, async (req, res) => {
	const list_packages = await pool.query('SELECT * FROM packages');
	res.render('add/list_packages', {list_packages: list_packages});
});

router.get('/package_delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
	await pool.query('DELETE FROM pack_subcat WHERE package_id = ?', [id]);
    await pool.query('DELETE FROM packages WHERE ID = ?', [id]);
    res.redirect('/add/packages_added');
});

router.get('/package_edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const packag = await pool.query('SELECT * FROM packages WHERE ID = ?', [id]);
	res.render('add/edit_packages', {packag: packag[0]});
});

router.post('/package_edit/:id', async (req, res) => {
	const { id } = req.params;
	const { name, description, price } = req.body;
	const editedPack = {
		name,
		description,
		price
	};
	await pool.query('UPDATE packages SET ? WHERE id = ?', [editedPack, id]);
	res.redirect('/add/packages_added');
});

module.exports = router;
