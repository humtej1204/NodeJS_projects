const express = require('express');
const router = express.Router();

const pool = require('../../config/dbConnection');
const { isLoggedIn } = require('../../lib/auth');

router.get('/subcateg', isLoggedIn, async (req, res) => {
	const list_categ = await pool.query('SELECT * FROM categories');
    res.render('add/subcat', {list_categ: list_categ});
});

router.post('/subcateg', async (req, res) => {
    const { name, category_id } = req.body;
    const newSubCat = {
        name,
		category_id
    }
	await pool.query('INSERT INTO subcateg SET ?', [newSubCat]);
    res.redirect('/add/subcateg_added')
});

router.get('/subcateg_added', isLoggedIn, async (req, res) => {
        const list_subcateg = await pool.query('SELECT subcateg.id as id, subcateg.name as name, categories.name as cat_name FROM subcateg INNER JOIN categories ON categories.id=subcateg.category_id;');
        res.render('add/list_subcateg', {list_subcateg: list_subcateg});
});

router.get('/subcat_delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
	await pool.query('DELETE FROM pack_subcat WHERE subcateg_id = ?', [id]);
    await pool.query('DELETE FROM subcateg WHERE ID = ?', [id]);
    res.redirect('/add/subcateg_added');
});

router.get('/subcat_edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const subcat = await pool.query('SELECT * FROM subcateg WHERE ID = ?', [id]);
    res.render('add/edit_subcat', {subcat: subcat[0]});
});

router.post('/subcat_edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category_id } = req.body;
    const editedSubCat = {
        name,
        category_id
    };
    await pool.query('UPDATE subcateg SET ? WHERE id = ?', [editedSubCat, id]);
    res.redirect('/add/subcateg_added');
});

module.exports = router;
