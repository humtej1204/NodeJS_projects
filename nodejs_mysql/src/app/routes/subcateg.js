const express = require('express');
const router = express.Router();

const pool = require('../../config/dbConnection');

router.get('/subcateg', (req, res) => {
    res.render('add/subcat');
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

router.get('/subcateg_added', async (req, res) => {
        const list_subcateg = await pool.query('SELECT * FROM subcateg');
        res.render('add/list_subcateg', {list_subcateg: list_subcateg});
});

router.get('/subcat_delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM subcateg WHERE ID = ?', [id]);
    res.redirect('/add/subcateg_added');
});

router.get('/subcat_edit/:id', async (req, res) => {
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
