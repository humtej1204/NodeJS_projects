const express = require('express');
const router = express.Router();

const pool = require('../../config/dbConnection');
const { isLoggedIn } = require('../../lib/auth');

router.get('/categories', isLoggedIn, (req, res) => {
    res.render('add/categories');
});

router.post('/categories', async (req, res) => {
    const { name } = req.body;
    const newCateg = {
        name
    }
    await pool.query('INSERT INTO categories SET ?', [newCateg]);
    res.redirect('/add/categories_added')
});

router.get('/categories_added', isLoggedIn, async (req, res) => {
        const list_categories = await pool.query('SELECT * FROM categories');
        res.render('add/list_categories', {list_categories: list_categories});
});

router.get('/category_delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
	const subcat = await pool.query('SELECT * FROM subcateg WHERE category_id = ?', [id]);
	subcat.forEach(async (element) => {
		await pool.query('DELETE FROM pack_subcat WHERE subcateg_id = ?', [element.id]);
	});
	await pool.query('DELETE FROM subcateg WHERE category_id = ?', [id]);
    await pool.query('DELETE FROM categories WHERE ID = ?', [id]);
	res.redirect('/add/categories_added');
});

router.get('/category_edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const category = await pool.query('SELECT * FROM categories WHERE ID = ?', [id]);
    res.render('add/edit_categories', {category: category[0]});
});

router.post('/category_edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const editedCat = {
        name
    };
    await pool.query('UPDATE categories SET ? WHERE id = ?', [editedCat, id]);
    res.redirect('/add/categories_added');
});

module.exports = router;
